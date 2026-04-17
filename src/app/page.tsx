const activeWorkflows = [
  {
    name: "Daily venture scout",
    type: "Research / build pipeline",
    status: "Healthy",
    trigger: "Every day • 4:00 PM",
    next: "In 21h",
  },
  {
    name: "Jarvis concierge inbound check",
    type: "Phone / summary loop",
    status: "Needs schedule",
    trigger: "Manual only",
    next: "Not configured",
  },
  {
    name: "GitHub publish review gate",
    type: "Repo automation",
    status: "Healthy",
    trigger: "On build completion",
    next: "Waiting for next repo",
  },
];

const projects = [
  {
    name: "Jarvis OS",
    stage: "Building shell",
    summary: "Control center for tasks, workflows, memory, concierge, and repos.",
    owner: "Jarvis",
  },
  {
    name: "ChaseLess",
    stage: "Polished MVP shell",
    summary: "AI AR copilot for small service businesses with follow-up logic and recovery dashboard.",
    owner: "Jarvis",
  },
  {
    name: "Venture Factory",
    stage: "Automation upgrade needed",
    summary: "Daily opportunity scouting and GitHub publishing workflow with stronger validation needed.",
    owner: "Jarvis",
  },
];

const memoryEntities = [
  {
    type: "Project",
    name: "Jarvis OS",
    relation: "depends on structured memory, workflow orchestration, and action logs",
  },
  {
    type: "Contact",
    name: "Ahmed",
    relation: "owner / operator / reviewer",
  },
  {
    type: "Workflow",
    name: "venture-factory-daily",
    relation: "scheduled recurring automation",
  },
  {
    type: "Capability",
    name: "PollyReach concierge",
    relation: "phone channel for calls, summaries, and receptionist mode",
  },
];

const actionFeed = [
  {
    title: "Phone concierge activated",
    detail: "Jarvis received a live PollyReach number and inbound answering prompt was configured.",
    time: "Today",
  },
  {
    title: "ChaseLess pushed to GitHub",
    detail: "Initial polished MVP shell published for review with passing lint and build.",
    time: "Today",
  },
  {
    title: "Workflow tooling expanded",
    detail: "Installed agentic workflow automation and n8n workflow automation skills for reliable orchestrations.",
    time: "Today",
  },
];

const workflowBuilderSteps = [
  {
    step: "1",
    title: "Define trigger",
    body: "Cron, webhook, manual request, file arrival, or heartbeat. Every workflow starts with an explicit trigger and success condition.",
  },
  {
    step: "2",
    title: "Compose execution graph",
    body: "Break the workflow into single-purpose steps with retries, dependency order, fallback branches, and human review gates.",
  },
  {
    step: "3",
    title: "Attach memory + logging",
    body: "Store run status, outputs, failure details, and links to projects or contacts so workflows stay auditable and recoverable.",
  },
  {
    step: "4",
    title: "Export implementation artifact",
    body: "Produce n8n JSON or internal automation blueprint without silent failure behavior.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1e335d_0%,#101827_34%,#0a0f17_100%)] text-slate-100">
      <section className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 lg:px-10 lg:py-14">
          <header className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-200">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                Jarvis OS • agent control center for OpenClaw
              </div>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                  One operating layer for tasks, workflows, memory, repos, and concierge automation.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                  Jarvis OS turns scattered agent capabilities into a real control center. Run automations, inspect memory,
                  manage projects, review failures, and keep the whole OpenClaw environment coherent.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#control-center"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  Explore control center
                </a>
                <a
                  href="#workflow-builder"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View workflow builder
                </a>
              </div>
            </div>

            <div className="grid w-full max-w-sm gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-sm text-slate-300">System summary</div>
              {[
                ["Active projects", "3"],
                ["Tracked workflows", "7"],
                ["Phone channels", "1 live"],
                ["Pending alerts", "2"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm text-slate-400">{label}</div>
                  <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>
          </header>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d1420]/80" id="control-center">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-14 lg:grid-cols-[1.35fr_0.95fr] lg:px-10">
          <div className="rounded-[30px] border border-white/10 bg-[#11192a] p-6 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.18em] text-cyan-300/80">Control center</div>
                <h2 className="mt-3 text-3xl font-semibold text-white">See the state of the whole agent environment in one place.</h2>
              </div>
              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                Unified status view
              </div>
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-[1.2fr_0.95fr]">
              <div className="overflow-hidden rounded-[26px] border border-white/8 bg-[#0b111b]">
                <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                  <div>
                    <div className="text-sm text-slate-400">Project board</div>
                    <div className="mt-1 text-lg font-medium text-white">Current builds, ownership, and next steps</div>
                  </div>
                  <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">Preview</span>
                </div>
                <div className="divide-y divide-white/8">
                  {projects.map((project) => (
                    <div key={project.name} className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_0.6fr_1.2fr_0.5fr] md:items-center">
                      <div>
                        <div className="font-medium text-white">{project.name}</div>
                        <div className="mt-1 text-sm text-slate-400">{project.summary}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Stage</div>
                        <div className="mt-1 text-sm text-slate-200">{project.stage}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Reason it matters</div>
                        <div className="mt-1 text-sm leading-6 text-slate-300">
                          {project.name === "Jarvis OS"
                            ? "This becomes the shell around all future OpenClaw capabilities."
                            : project.name === "ChaseLess"
                              ? "Proof that Jarvis can turn internal capability into polished external product output."
                              : "The scouting engine feeds future product and automation decisions."}
                        </div>
                      </div>
                      <div className="text-sm text-cyan-200">{project.owner}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[26px] border border-white/8 bg-[#0b111b] p-5">
                  <div className="text-sm text-slate-400">Action feed</div>
                  <div className="mt-4 space-y-4">
                    {actionFeed.map((item) => (
                      <div key={item.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-medium text-white">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.time}</div>
                        </div>
                        <div className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/8 bg-[#0b111b] p-5">
                  <div className="text-sm text-slate-400">Alerts requiring attention</div>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                      Venture Factory ranking still needs smarter validation before full autonomy.
                    </div>
                    <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4">
                      Concierge inbound polling is not scheduled yet — missed call summaries remain a risk.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Workflow runtime view</div>
              <div className="mt-4 space-y-4">
                {activeWorkflows.map((workflow) => (
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
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
                      <div>
                        <div className="text-slate-500">Trigger</div>
                        <div className="mt-1">{workflow.trigger}</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Next run</div>
                        <div className="mt-1">{workflow.next}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-cyan-400/20 bg-cyan-400/10 p-6 text-cyan-50">
              <div className="text-sm uppercase tracking-[0.18em] text-cyan-200/80">Why build this first</div>
              <p className="mt-4 text-sm leading-7 text-cyan-50/90">
                Jarvis OS is the multiplier app. It makes all OpenClaw capabilities discoverable, governable, and reusable — instead of living as scattered files, repos, and half-remembered workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" id="workflow-builder">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Workflow builder</div>
            <h2 className="mt-4 text-3xl font-semibold text-white">Design durable automations instead of brittle one-off scripts.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              This module turns agent capabilities into reusable workflows with triggers, retries, review queues, and audit trails.
            </p>
            <div className="mt-8 grid gap-4">
              {workflowBuilderSteps.map((item) => (
                <div key={item.step} className="rounded-[24px] border border-white/8 bg-[#11192a] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300 text-sm font-semibold text-slate-950">
                      {item.step}
                    </div>
                    <div className="text-xl font-medium text-white">{item.title}</div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#11192a] p-6 shadow-2xl shadow-black/20">
            <div className="text-sm uppercase tracking-[0.18em] text-cyan-300/80">Workflow blueprint preview</div>
            <div className="mt-6 rounded-[26px] border border-white/8 bg-[#0b111b] p-5 font-mono text-sm leading-7 text-slate-200">
              <div className="text-cyan-200">workflow: concierge-inbound-summary</div>
              <div className="mt-2">trigger: cron / every-10-minutes</div>
              <div>dedupe_key: call_id</div>
              <div>review_queue: missed-or-failed-summaries</div>
              <div className="mt-4 text-slate-400">steps:</div>
              <div>  1. poll inbound call feed</div>
              <div>  2. validate new calls against last seen ids</div>
              <div>  3. summarize transcript into concise brief</div>
              <div>  4. write structured log entry</div>
              <div>  5. notify owner</div>
              <div>  6. on failure → retry + queue for human review</div>
            </div>
            <div className="mt-6 rounded-[26px] border border-white/8 bg-[#0b111b] p-5">
              <div className="text-sm text-slate-400">Export targets</div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-200">
                {['n8n workflow JSON', 'OpenClaw task blueprint', 'Runbook / markdown spec', 'Failure review queue'].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="rounded-[30px] border border-white/10 bg-[#11192a] p-6 shadow-2xl shadow-black/20">
            <div className="text-sm uppercase tracking-[0.18em] text-cyan-300/80">Structured project brain</div>
            <h2 className="mt-4 text-3xl font-semibold text-white">Make memory queryable instead of relying on scattered notes.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Projects, contacts, workflows, repos, and decisions become linked entities so Jarvis can reason over what exists, what changed, and what depends on what.
            </p>
            <div className="mt-8 overflow-hidden rounded-[26px] border border-white/8 bg-[#0b111b]">
              <div className="border-b border-white/8 px-5 py-4 text-sm text-slate-400">Entity graph preview</div>
              <div className="divide-y divide-white/8">
                {memoryEntities.map((entity) => (
                  <div key={entity.type + entity.name} className="grid gap-3 px-5 py-4 md:grid-cols-[0.6fr_0.8fr_1.5fr] md:items-center">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{entity.type}</div>
                    <div className="font-medium text-white">{entity.name}</div>
                    <div className="text-sm leading-6 text-slate-300">{entity.relation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Why this matters</div>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
                <p>Without a structured brain, the system forgets relationships between contacts, workflows, products, and failures.</p>
                <p>With a structured brain, Jarvis can answer questions like:</p>
                <ul className="list-disc space-y-2 pl-5 text-slate-200">
                  <li>What projects are active right now?</li>
                  <li>Which workflows touch concierge, GitHub, or daily scouting?</li>
                  <li>What did we already build and publish?</li>
                  <li>What dependencies break if a tool or provider fails?</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[30px] border border-cyan-400/20 bg-cyan-400/10 p-6 text-cyan-50">
              <div className="text-sm uppercase tracking-[0.18em] text-cyan-200/80">Build order</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-cyan-50/90">
                <div>1. Ship the Jarvis OS shell and control center</div>
                <div>2. Add real routes for workflows, projects, and memory entities</div>
                <div>3. Wire live data from OpenClaw artifacts, cron jobs, and repo state</div>
                <div>4. Add editable workflow builder and action logs</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
