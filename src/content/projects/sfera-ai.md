---
title: "DataSfera"
description: "A production database intelligence agent that transforms natural language into optimized MS SQL queries for enterprise ERP systems. Features a real-time streaming UI, automated report persistence to Cloudflare R2, and voice-to-text integration via Groq Whisper."
tools: ["cloudflareworkers", "react", "googlegemini", "tailwindcss", "zod"]
order: 4
---
### Project Overview
Developed as a strategic joint venture by my firm, *Logias*, for SferaSoft's enterprise
ERP ecosystem. I architected, deployed, and currently maintain a cloud-native platform
that extends legacy native Windows applications, securely replicating complex access and
permission layers to offer a natural language data extraction engine.

This engine solves the traditional "reporting bottleneck" in corporate
environments. Instead of waiting for IT to write custom SQL reports or wrestling with
complex filter interfaces, users query the database natively:

> "Show me all invoices from last month grouped by client."

Beyond introducing modern AI capabilities, this project serves as the foundational
architecture for migrating the company's legacy systems toward a high-performance,
cloud-native future.

### Key Features
- **Natural Language to SQL**: Leverages Gemini models to dynamically map and execute
  complex SQL queries against a relational ERP schema.
- **Streaming NDJSON**: Results are streamed via a secure database proxy, minimizing
  memory overhead and allowing the UI to render large datasets in real time.
- **Automated Persistence**: Query results and generated schemas are persisted to
  Cloudflare R2 for low-latency sharing and compliance tracking.
- **Interactive UI**: Engineered a high-throughput UI allowing corporate users to
  instantly filter, sort, and export live data to CSV/PDF.
