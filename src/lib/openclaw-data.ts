import fs from "node:fs";
import path from "node:path";

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

function countMatching(prefix: string, files: string[]) {
  return files.filter((file) => file.startsWith(prefix) && file.endsWith(".json")).length;
}

export function getWorkspaceSummary() {
  const receiptFiles = safeReadDir(path.join(artifactsRoot, "receipts"))
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  const repoEntries = safeReadDir(path.join(ventureFactoryRoot, "repos"))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

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

  return {
    projectsTracked: repoEntries.length,
    receipts: {
      codingPlanRuns: countMatching("coding.plan", receiptFiles),
      fileOpsRuns: countMatching("file_ops.inspect", receiptFiles),
      researchRuns: countMatching("research.inspect", receiptFiles),
      ventureFactoryRuns: countMatching("venture_factory.daily", receiptFiles),
    },
    repos: repoEntries,
    latestDaily: latestDaily
      ? {
          date: latestDaily,
          files: latestDailyFiles,
        }
      : null,
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
  return [
    {
      name: "Daily venture scout",
      type: "Research / build pipeline",
      status: summary.receipts.ventureFactoryRuns > 0 ? "Healthy" : "Idle",
      trigger: "Scheduled daily run",
      next: "Managed via OpenClaw cron",
    },
    {
      name: "Concierge inbound review",
      type: "Phone / summary loop",
      status: summary.concierge.phoneProvider ? "Partially live" : "Not configured",
      trigger: "Manual until polling is scheduled",
      next: summary.concierge.phoneProvider ? "Ready for cron wiring" : "Needs provider",
    },
    {
      name: "Artifact telemetry",
      type: "Workspace state reader",
      status: "Healthy",
      trigger: "On dashboard load",
      next: `${summary.receipts.codingPlanRuns + summary.receipts.researchRuns} tracked runs available`,
    },
  ];
}
