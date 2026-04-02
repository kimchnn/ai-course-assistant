import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resources } from '@/lib/db/schema/resources';
import { eq } from 'drizzle-orm';

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  await db.delete(resources).where(eq(resources.id, id));
  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get('courseId');

  if (!courseId) {
    return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
  }

  const docs = await db
    .select({ id: resources.id, name: resources.content, createdAt: resources.createdAt })
    .from(resources)
    .where(eq(resources.courseId, courseId))
    .orderBy(resources.createdAt);

  return NextResponse.json(docs);
}
