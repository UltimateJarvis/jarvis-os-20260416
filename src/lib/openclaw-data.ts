import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const workspaceRoot = path.resolve(process.cwd(), "..", "..", "..");
const artifactsRoot = path.join(workspaceRoot, "artifacts");
const conciergeRoot = path.join(workspaceRoot, "automation", "concierge");
const ventureFactoryRoot = path.join(artifactsRoot, "venture-factory");

function safeReadDir(dirPath: string) {
  try {
    return fs.readdirSync(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

function safeReadJson<T>(filePath: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function safeExec(command: string, cwd: string) {
  try {
    return execSync(command, { cwd, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
}

function countMatching(prefix: string, files: string[]) {
  return files.filter((file) => file.startsWith(prefix) && file.endsWith(".json")).length;
}

function listLatestFiles(dirPath: string, limit = 5) {
  return safeReadDir(dirPath)
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      const stat = fs.statSync(fullPath);
      return { name: entry.name, mtimeMs: stat.mtimeMs };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs)
    .slice(0, limit);
}

function getRepoStatus(repoName: string) {
  const repoPath = path.join(ventureFactoryRoot, "repos", repoName);
  const status = safeExec("git status --short", repoPath);
  const lastCommit = safeExec("git rev-parse --short HEAD", repoPath);
  const branch = safeExec("git rev-parse --abbrev-ref HEAD", repoPath);
  return {
    name: repoName,
    branch: branch || "unknown",
    lastCommit: lastCommit || "—",
    clean: status.length === 0,
    dirtyFiles: status.length === 0 ? 0 : status.split(/\r?\n/).filter(Boolean).length,
  };
}

function getCronJobs() {
  const cronSnapshotPath = path.join(workspaceRoot, "automation", "jarvis-os-cron-snapshot.json");
  return safeReadJson<{ jobs: Array<Record<string, unknown>> }>(cronSnapshotPath, { jobs: [] }).jobs;
}

export function getWorkspaceSummary() {
  const receiptFiles = safeReadDir(path.join(artifactsRoot, "receipts"))
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  const repoEntries = safeReadDir(path.join(ventureFactoryRoot, "repos"))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const repoStatuses = repoEntries.map(getRepoStatus);

  const dailyDirs = safeReadDir(path.join(ventureFactoryRoot, "daily"))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const latestDaily = dailyDirs.at(-1);
  const latestDailyDir = latestDaily ? path.join(ventureFactoryRoot, "daily", latestDaily) : null;
  const latestDailyFiles = latestDailyDir
    ? safeReadDir(latestDailyDir).filter((entry) => entry.isFile()).map((entry) => entry.name)
    : [];

  const conciergeConfig = safeReadJson(path.join(conciergeRoot, "config.json"), {
    persona_name: "Jarvis",
    phone_provider: null,
    sms_provider: null,
    email_provider: null,
    spending_allowed: false,
  });

  const conciergeTasks = safeReadDir(path.join(conciergeRoot, "tasks"))
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();

  const recentVentureOutputs = listLatestFiles(path.join(artifactsRoot, "outputs", "venture_factory.daily"), 5);
  const cronJobs = getCronJobs();

  return {
    projectsTracked: repoEntries.length,
    receipts: {
      codingPlanRuns: countMatching("coding.plan", receiptFiles),
      fileOpsRuns: countMatching("file_ops.inspect", receiptFiles),
      researchRuns: countMatching("research.inspect", receiptFiles),
      ventureFactoryRuns: countMatching("venture_factory.daily", receiptFiles),
    },
    repos: repoEntries,
    repoStatuses,
    latestDaily: latestDaily
      ? {
          date: latestDaily,
          files: latestDailyFiles,
        }
      : null,
    recentVentureOutputs,
    cronJobs,
    concierge: {
      persona: conciergeConfig.persona_name,
      phoneProvider: conciergeConfig.phone_provider,
      smsProvider: conciergeConfig.sms_provider,
      emailProvider: conciergeConfig.email_provider,
      spendingAllowed: conciergeConfig.spending_allowed,
      taskTemplates: conciergeTasks,
    },
    memoryEntities: [
      {
        type: "Project",
        name: "Jarvis OS",
        relation: "Control center for tasks, workflows, memory, and automation.",
      },
      {
        type: "Project",
        name: "ChaseLess",
        relation: "Published MVP shell for AI accounts receivable operations.",
      },
      {
        type: "Workflow",
        name: "venture-factory-daily",
        relation: "Recurring scouting and repo generation automation.",
      },
      {
        type: "Capability",
        name: "PollyReach concierge",
        relation: "Live phone concierge channel configured for Jarvis persona.",
      },
    ],
  };
}

export function getProjectCards() {
  const summary = getWorkspaceSummary();
  const latestDailyLabel = summary.latestDaily?.date ?? "No daily run yet";

  return [
    {
      name: "Jarvis OS",
      stage: "OpenClaw control center",
      summary: "Single cockpit for workflow state, structured memory, project tracking, and operational visibility.",
      owner: summary.concierge.persona,
    },
    {
      name: "ChaseLess",
      stage: summary.repos.includes("chaseless-20260416") ? "Published MVP shell" : "Planned",
      summary: "AI accounts receivable copilot focused on overdue invoice follow-up and cash recovery workflows.",
      owner: summary.concierge.persona,
    },
    {
      name: "Venture Factory",
      stage: `${summary.receipts.ventureFactoryRuns} runs logged`,
      summary: `Latest daily artifact set: ${latestDailyLabel}. Needs better signal quality before full autonomy.`,
      owner: summary.concierge.persona,
    },
  ];
}

export function getWorkflowCards() {
  const summary = getWorkspaceSummary();
  const cronBacked = summary.cronJobs.map((job) => ({
    name: String(job.name ?? "Unnamed job"),
    type: String((job.payload as { kind?: string } | undefined)?.kind ?? "cron job"),
    status: String((job.state as { lastStatus?: string } | undefined)?.lastStatus ?? "scheduled"),
    trigger: `${(job.schedule as { kind?: string; expr?: string; tz?: string } | undefined)?.expr ?? "schedule"} • ${(job.schedule as { tz?: string } | undefined)?.tz ?? "UTC"}`,
    next: (job.state as { nextRunAtMs?: number } | undefined)?.nextRunAtMs
      ? new Date((job.state as { nextRunAtMs: number }).nextRunAtMs).toLocaleString()
      : "pending",
  }));

  return [
    ...cronBacked,
    {
      name: "Artifact telemetry",
      type: "Workspace state reader",
      status: "healthy",
      trigger: "On dashboard load",
      next: `${summary.receipts.codingPlanRuns + summary.receipts.researchRuns} tracked runs available`,
    },
  ];
}
