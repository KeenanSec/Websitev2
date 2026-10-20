---
title: Understanding Windows Process Creation
summary: A breakdown of the process creation flow, key structures, and what actually happens under the hood.
date: 2026-10-03
category: Reverse Engineering
tags: [windows, internals, processes, reverse-engineering]
demo: true
---
Clicking an application icon hides a great deal of machinery. This demonstration introduces questions for studying process creation; it is not a completed reverse engineering report or a comprehensive description of Windows internals.

## Separate the concepts

A process provides a context in which code can execute. A thread is a unit of execution within that context. An executable file on disk and a running process are related, but they are not interchangeable concepts.

When reading about process creation, keep a small glossary for unfamiliar structures and APIs. Check details against the Microsoft documentation for the Windows version being studied.

## Follow one harmless example

Start a familiar application in an isolated lab and inspect the resulting process tree. Ask:

- What process initiated the launch?
- Which executable image was used?
- What command line is visible?
- Which user context is associated with it?
- What evidence is available after the process exits?

A notebook can capture those observations without assuming the answer:

```typescript
type Observation = {
  image: string;
  parentImage: string;
  commandLine: string;
  capturedAt: string;
};

const notes: Observation[] = [];
```

## Parent relationships are a clue

A parent-child relationship can help explain a launch, but it should be considered alongside other context. A name alone does not establish intent. Command lines, timestamps, and the surrounding activity all matter.

## Read, observe, revise

Draw a simple lifecycle before opening a debugger. Add details only when an observation or a primary reference supports them. Distinguish what the documentation says, what the tool displays, and what you infer.

The next step for a real article would be to include the exact environment, reproducible steps, and annotated observations.
