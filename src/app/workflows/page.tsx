import { getWorkflowCards } from "@/lib/openclaw-data";

export default function WorkflowsPage() {
  const workflows = getWorkflowCards();

  return (
    <main className="min-h-screen bg-[#0a0f17] px-6 py-12 text-slate-100 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-300/80">Workflows</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Operational workflow registry</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            A working route for viewing workflow state, readiness, and trigger shape using local OpenClaw data.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {workflows.map((workflow) => (
            <div key={workflow.name} className="rounded-[28px] border border-white/10 bg-[#11192a] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{workflow.name}</h2>
                  <p className="mt-2 text-sm text-slate-400">{workflow.type}</p>
                </div>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                  {workflow.status}
                </span>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div>
                  <div className="text-slate-500">Trigger</div>
                  <div className="mt-1">{workflow.trigger}</div>
                </div>
                <div>
                  <div className="text-slate-500">Next</div>
                  <div className="mt-1">{workflow.next}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
