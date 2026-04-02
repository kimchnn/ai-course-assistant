import FeatureCard from "@/components/FeatureCard";
import UploadMaterials from "@/components/UploadMaterials";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const courseName = courseId.toUpperCase();

  return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-8">{courseName}</h1>
        </div>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Upload Materials</h2>
          <UploadMaterials courseId={courseId} />
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
      </div>
      </div>
  );
}