import Sidebar from "@/app/components/sidebar";

export default async function SummariesPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Summarized Notes</h1>
        <p className="mt-2 text-gray-600">
          Course: {courseId.toUpperCase()}
        </p>
      </main>
    </div>
  );
}