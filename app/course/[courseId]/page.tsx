import Sidebar from "@/app/components/sidebar";
import FeatureCard from "@/app/components/featureCard";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const courseName = courseId.toUpperCase();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{courseName}</h1>
          <p className="mt-2 text-gray-600">
            Upload materials and use AI study tools for this course.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Course Overview</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Upcoming</h3>
              <p className="text-gray-700">Midterm 1 — Oct 10</p>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Weak Topics</h3>
              <p className="text-gray-700">Recursion, tree traversal</p>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Readiness</h3>
              <p className="mb-2 text-gray-700">68%</p>
              <div className="h-3 rounded-full bg-gray-200">
                <div className="h-3 w-2/3 rounded-full bg-black" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Upload Materials</h2>

          <div className="rounded-2xl border-2 border-dashed bg-gray-50 p-8 text-center text-gray-500">
            Drag and drop files here
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Uploaded Documents</h2>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <ul className="space-y-3 text-gray-700">
              <li>Lecture_3.pdf</li>
              <li>Lecture_4.pdf</li>
              <li>Midterm_2019.pdf</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Study Tools</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard
              title="Summarized Notes"
              description="Generate structured summaries from uploaded course materials."
              href={`/course/${courseId}/summaries`}
            />

            <FeatureCard
              title="Flashcards"
              description="Create AI-generated flashcards for active recall practice."
              href={`/course/${courseId}/flashcards`}
            />

            <FeatureCard
              title="Practice Quiz"
              description="Generate quizzes and exam-style questions from your notes."
              href={`/course/${courseId}/quiz`}
            />

            <FeatureCard
              title="Chatbot"
              description="Ask questions about your slides, notes, and past exams."
              href={`/course/${courseId}/chat`}
            />
          </div>
        </section>
      </main>
    </div>
  );
}