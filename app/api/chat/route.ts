import { NextRequest, NextResponse } from 'next/server';
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { cosineDistance, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { embeddings as embeddingsTable } from '@/lib/db/schema/embeddings';
import { resources } from '@/lib/db/schema/resources';
import { env } from '@/lib/env.mjs';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const { message, courseId } = await req.json();

  // Step 1: Embed the user's question
  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
    apiKey: env.OPENAI_API_KEY,
  });
  const queryVector = await embeddings.embedQuery(message);

  // Step 2: Find the most similar chunks in the DB
  const similarity = cosineDistance(embeddingsTable.embedding, queryVector);
  const similarChunks = await db
    .select({ content: embeddingsTable.content })
    .from(embeddingsTable)
    .innerJoin(resources, eq(embeddingsTable.resourceId, resources.id))
    .where(eq(resources.courseId, courseId))
    .orderBy(similarity)
    .limit(5);

  const context = similarChunks.map(c => c.content).join('\n\n');

  // Step 3: Send to GPT with context
  const llm = new ChatOpenAI({
    model: 'gpt-4o-mini',
    apiKey: env.OPENAI_API_KEY,
  });

  const response = await llm.invoke([
    {
      role: 'system',
      content: `You are a helpful study assistant. Use the following context from the user's course materials to answer their question. If the context doesn't contain the answer, say you don't know.\n\nContext:\n${context}`,
    },
    {
      role: 'user',
      content: message,
    },
  ]);

  return NextResponse.json({ reply: response.content });
}
