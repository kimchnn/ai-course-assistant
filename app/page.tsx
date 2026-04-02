import Link from "next/link";
import { BookOpen } from "lucide-react";
import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema/courses";

export default async function HomePage() {
  const allCourses = await db.select().from(courses).orderBy(courses.createdAt);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl p-8">
        <h1 className="text-3xl font-bold mb-8">AI Course Assistant</h1>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">My Courses</h2>

          {allCourses.length === 0 ? (
            <div className="rounded-2xl border bg-white p-6 shadow-sm text-gray-500">
              No courses yet. Add a course from the sidebar to get started.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {allCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/course/${course.name.toLowerCase().replace(/\s+/g, "")}`}
                  className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
                >
                  <BookOpen className="h-5 w-5 text-gray-500 shrink-0" />
                  <span className="font-medium text-gray-800">{course.name}</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
