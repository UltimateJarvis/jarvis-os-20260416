import Link from "next/link";
import { getProjectCards, getWorkflowCards, getWorkspaceSummary } from "@/lib/openclaw-data";

export default function Home() {
  const summary = getWorkspaceSummary();
  const projects = getProjectCards();
  const workflows = getWorkflowCards();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1e335d_0%,#101827_34%,#0a0f17_100%)] text-slate-100">
      <section className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 lg:px-10 lg:py-14">
          <header className="flex flex-col gap-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-200">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  Jarvis OS • OpenClaw-native control center
                </div>
                <div className="space-y-4">
                  <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                    A working cockpit for OpenClaw projects, workflows, memory, and concierge ops.
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                    This build reads live-ish workspace artifacts so the dashboard reflects the actual OpenClaw environment,
                    not just a static concept page.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    ["Projects", "/projects"],
                    ["Workflows", "/workflows"],
                    ["Memory", "/memory"],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid w-full max-w-sm gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="text-sm text-slate-300">Workspace summary</div>
                {[
                  ["Tracked repos", String(summary.repos.length)],
                  ["Coding plan runs", String(summary.receipts.codingPlanRuns)],
                  ["Research runs", String(summary.receipts.researchRuns)],
                  ["Venture-factory runs", String(summary.receipts.ventureFactoryRuns)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm text-slate-400">{label}</div>
                    <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </header>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d1420]/80">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-14 lg:grid-cols-[1.35fr_0.95fr] lg:px-10">
          <div className="rounded-[30px] border border-white/10 bg-[#11192a] p-6 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.18em] text-cyan-300/80">Project state</div>
                <h2 className="mt-3 text-3xl font-semibold text-white">Actual repos and initiatives discovered in the workspace.</h2>
              </div>
              <Link
                href="/projects"
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200"
              >
                Open project registry
              </Link>
            </div>

            <div className="mt-8 grid gap-4">
              {projects.map((project) => (
                <div key={project.name} className="rounded-[24px] border border-white/8 bg-[#0b111b] p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="text-xl font-medium text-white">{project.name}</div>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">{project.summary}</p>
                    </div>
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">{project.stage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Workflow state</div>
              <div className="mt-4 space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.name} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-medium text-white">{workflow.name}</div>
                        <div className="mt-1 text-sm text-slate-400">{workflow.type}</div>
                      </div>
                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                        {workflow.status}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-slate-300">
                      <div>Trigger: {workflow.trigger}</div>
                      <div>Next: {workflow.next}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-cyan-400/20 bg-cyan-400/10 p-6 text-cyan-50">
              <div className="text-sm uppercase tracking-[0.18em] text-cyan-200/80">Concierge state</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-cyan-50/90">
                <div>Persona: {summary.concierge.persona}</div>
                <div>Phone provider: {summary.concierge.phoneProvider ?? "not configured"}</div>
                <div>SMS provider: {summary.concierge.smsProvider ?? "draft-only"}</div>
                <div>Email provider: {summary.concierge.emailProvider ?? "draft-only"}</div>
                <div>Spending allowed: {summary.concierge.spendingAllowed ? "yes" : "no"}</div>
                <div>Task templates: {summary.concierge.taskTemplates.join(", ") || "none"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
