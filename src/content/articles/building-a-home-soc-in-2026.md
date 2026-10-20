---
title: Building a Home SOC in 2026
summary: Lessons, mistakes, and what I learned from building a detection pipeline with Wazuh, Sysmon, and Atomic Red Team.
date: 2026-10-08
category: Cybersecurity
tags: [soc, detection, sysmon, homelab]
demo: true
---
A home security operations center can begin with one useful question: **can I explain what happened on a machine from its logs?** This demonstration sketches a learning exercise rather than documenting a finished deployment.

## Start with a question

Collecting everything is easy to describe and difficult to maintain. A more useful first milestone is a small, repeatable observation: start a harmless process, find its event, and explain its parent and command line.

A possible lab has three parts:

1. An isolated Windows virtual machine that produces events.
2. A collector that keeps the events available for investigation.
3. A notebook that records the expected result and the actual evidence.

## Keep the experiment small

Tools such as Sysmon and Wazuh are possible components to investigate. Versions, deployment requirements, and event configurations should be checked against their official documentation before installation. A tool being installed is not evidence that a detection works.

The following JSON is an illustrative notebook entry, not a collector configuration:

```json
{
  "question": "Can I find my test process?",
  "expected": "A process event with a parent and command line",
  "observed": null,
  "next_step": "Run a harmless test in the isolated VM"
}
```

## Make evidence part of the workflow

For each experiment, record the timestamp, the machine, the action, and the matching event. If an event is missing, investigate collection before writing a detection rule.

> A useful lab is one where the result can be explained and repeated.

## A next experiment

Compare two normal applications and their process trees. Write down what differs and what stays consistent. That small exercise creates a baseline for later questions without pretending that every unusual event is malicious.
