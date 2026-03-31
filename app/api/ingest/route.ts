import { NextRequest, NextResponse } from 'next/server';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { env } from "@/lib/env.mjs";
import { db } from "@/lib/db";
import { resources } from "@/lib/db/schema/resources";
import { embeddings as embeddingsTable } from "@/lib/db/schema/embeddings";


export async function POST(req: NextRequest) {
  // Step 1: Receive File
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Step 2: Split into chunks
  const blob = new Blob([new Uint8Array(buffer)], { type: 'application/pdf' });
  const loader = new PDFLoader(blob);
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 80,
  });
  const chunks = await splitter.splitDocuments(docs);

  // Step 3: Embed each chunk
  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
    apiKey: env.OPENAI_API_KEY,
  });
  const vectors = await embeddings.embedDocuments(chunks.map(c => c.pageContent));

  // Step 4: Store in DB
  const [resource] = await db.insert(resources).values({ content: file.name }).returning();

  await db.insert(embeddingsTable).values(
    chunks.map((chunk, i) => ({
      resourceId: resource.id,
      content: chunk.pageContent,
      embedding: vectors[i],
    }))
  );

  return NextResponse.json({ message: `Stored ${chunks.length} chunks from ${file.name}` });
}

