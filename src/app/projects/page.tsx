import { getProjectCards } from "@/lib/openclaw-data";

export default function ProjectsPage() {
  const projects = getProjectCards();

  return (
    <main className="min-h-screen bg-[#0a0f17] px-6 py-12 text-slate-100 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-300/80">Projects</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Tracked OpenClaw projects</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Real projects derived from the current workspace state and repo inventory.
          </p>
        </div>

        <div className="grid gap-5">
          {projects.map((project) => (
            <div key={project.name} className="rounded-[28px] border border-white/10 bg-[#11192a] p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{project.name}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{project.summary}</p>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                  {project.stage}
                </div>
              </div>
              <div className="mt-5 text-sm text-slate-400">Owner: {project.owner}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
