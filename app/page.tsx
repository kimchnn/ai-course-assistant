import AppSidebar from "@/components/AppSidebar";

export default function HomePage() {
  return (
     <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl p-8">
          <h1 className="text-3xl font-bold mb-8">AI Course Assistant</h1>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Upcoming Assessments</h2>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <ul className="space-y-3 text-gray-700">
              <li>Assignment 1 — CPSC 310</li>
              <li>Quiz 2 — ECON 101</li>
              <li>Midterm 1 — CPSC 210</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Recommended Study</h2>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <ul className="space-y-3 text-gray-700">
              <li>Review recursion concepts for CPSC 210</li>
              <li>Practice quadtree pruning flashcards for CPSC 310</li>
              <li>Summarize supply and demand notes for ECON 101</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Course Readiness</h2>
          <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
            <div>
              <p className="mb-1 font-medium">CPSC 310</p>
              <div className="h-3 rounded-full bg-gray-200">
                <div className="h-3 w-2/3 rounded-full bg-black" />
              </div>
            </div>

            <div>
              <p className="mb-1 font-medium">CPSC 210</p>
              <div className="h-3 rounded-full bg-gray-200">
                <div className="h-3 w-1/2 rounded-full bg-black" />
              </div>
            </div>

            <div>
              <p className="mb-1 font-medium">ECON 101</p>
              <div className="h-3 rounded-full bg-gray-200">
                <div className="h-3 w-3/4 rounded-full bg-black" />
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
  );
}