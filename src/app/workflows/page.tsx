import { getWorkspaceSummary, getWorkflowCards } from "@/lib/openclaw-data";

export default function WorkflowsPage() {
  const workflows = getWorkflowCards();
  const summary = getWorkspaceSummary();

  return (
    <main className="min-h-screen bg-[#0a0f17] px-6 py-12 text-slate-100 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-300/80">Workflows</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Operational workflow registry</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Real workflow state using local OpenClaw snapshots, receipts, and artifact history.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-5 md:grid-cols-2">
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

          <div className="grid gap-6">
            <div className="rounded-[28px] border border-white/10 bg-[#11192a] p-6">
              <h2 className="text-xl font-semibold text-white">Recent venture-factory outputs</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                {summary.recentVentureOutputs.map((artifact) => (
                  <div key={artifact.name} className="rounded-2xl border border-white/8 bg-[#0b111b] p-4">
                    <div className="font-medium text-white">{artifact.name}</div>
                    <div className="mt-2 text-slate-400">Updated {new Date(artifact.mtimeMs).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#11192a] p-6">
              <h2 className="text-xl font-semibold text-white">Builder notes</h2>
              <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                <div>- Use local cron snapshots for runtime-safe visibility.</div>
                <div>- Add review queues before enabling destructive or external workflows.</div>
                <div>- Prefer idempotent actions and explicit artifact logging.</div>
                <div>- Export n8n or OpenClaw automation definitions from the same graph later.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
