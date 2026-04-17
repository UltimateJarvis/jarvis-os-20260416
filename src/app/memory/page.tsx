import { getWorkspaceSummary } from "@/lib/openclaw-data";

export default function MemoryPage() {
  const summary = getWorkspaceSummary();

  return (
    <main className="min-h-screen bg-[#0a0f17] px-6 py-12 text-slate-100 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-300/80">Structured memory</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Project brain / entity graph</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            This route exposes a structured, queryable layer for projects, workflows, capabilities, and operating context.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#11192a] p-6">
            <h2 className="text-2xl font-semibold text-white">Entities</h2>
            <div className="mt-6 space-y-4">
              {summary.memoryEntities.map((entity) => (
                <div key={entity.type + entity.name} className="rounded-2xl border border-white/8 bg-[#0b111b] p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{entity.type}</div>
                  <div className="mt-2 text-lg font-medium text-white">{entity.name}</div>
                  <div className="mt-2 text-sm leading-7 text-slate-300">{entity.relation}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[28px] border border-white/10 bg-[#11192a] p-6">
              <h2 className="text-xl font-semibold text-white">Workspace facts</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div>Tracked repos: {summary.repos.length}</div>
                <div>Concierge persona: {summary.concierge.persona}</div>
                <div>Phone provider: {summary.concierge.phoneProvider ?? "not configured"}</div>
                <div>SMS provider: {summary.concierge.smsProvider ?? "draft-only"}</div>
                <div>Email provider: {summary.concierge.emailProvider ?? "draft-only"}</div>
                <div>Spending allowed: {summary.concierge.spendingAllowed ? "yes" : "no"}</div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#11192a] p-6">
              <h2 className="text-xl font-semibold text-white">Latest venture-factory artifact</h2>
              <div className="mt-5 text-sm leading-7 text-slate-300">
                {summary.latestDaily ? (
                  <>
                    <div>Date: {summary.latestDaily.date}</div>
                    <div className="mt-3">Files:</div>
                    <ul className="mt-2 list-disc pl-5">
                      {summary.latestDaily.files.map((file) => (
                        <li key={file}>{file}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div>No daily venture-factory outputs found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
