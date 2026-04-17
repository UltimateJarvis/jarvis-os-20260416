# Jarvis OS

Jarvis OS is a control center for an OpenClaw-based agent environment.

## Purpose

Turn scattered agent capabilities into one operating layer for:
- tasks
- projects
- workflows
- cron jobs
- memory / entity graph
- phone concierge operations
- repo activity
- action logs and alerts

## Product pillars

### 1. Control Center
A unified dashboard for project state, workflow health, alerts, and recent actions.

### 2. Workflow Builder
A safer automation designer for trigger/action orchestration, retries, failure handling, and exportable implementation artifacts.

### 3. Structured Project Brain
A memory layer that links projects, contacts, workflows, repos, and capabilities as queryable entities.

## Current state

This repo currently contains a polished product shell / concept UI for the first release direction.

## Recommended next steps

1. Add real routes for projects, workflows, and memory entities
2. Connect to OpenClaw artifacts and cron state
3. Add workflow drafting / export tools
4. Add structured CRUD for contacts, repos, tasks, and linked objects
5. Add alert center and review queue handling

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000
