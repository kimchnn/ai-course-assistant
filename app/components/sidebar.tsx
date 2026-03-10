import Link from "next/link";
import { courses } from "@/data/courses";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r bg-gray-50 p-5">
      <h2 className="mb-6 text-2xl font-bold">Courses</h2>

      <div className="space-y-3">
        <Link
          href="/"
          className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-200"
        >
          Home
        </Link>

        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/course/${course.id}`}
            className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-200"
          >
            {course.name}
          </Link>
        ))}
      </div>

      <button className="mt-6 rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-100">
        + Add Course
      </button>
    </aside>
  );
}