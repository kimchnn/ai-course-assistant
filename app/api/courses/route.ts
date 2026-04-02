import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { courses } from '@/lib/db/schema/courses';
import { resources } from '@/lib/db/schema/resources';
import { eq } from 'drizzle-orm';

export async function GET() {
  const allCourses = await db.select().from(courses).orderBy(courses.createdAt);
  return NextResponse.json(allCourses);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Course name is required' }, { status: 400 });
  }

  const [course] = await db.insert(courses).values({ name: name.trim() }).returning();
  return NextResponse.json(course);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  await db.delete(resources).where(eq(resources.courseId, id));
  await db.delete(courses).where(eq(courses.id, id));
  return NextResponse.json({ success: true });
}
