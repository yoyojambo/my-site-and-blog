---
title: "Sfera AI Reporting Agent"
description: "An intelligent agent that transforms natural language into MS SQL queries for ERP systems. Features a real-time streaming UI, automated report persistence to Cloudflare R2, and voice-to-text integration via Groq Whisper."
tools: ["cloudflareworkers", "react", "googlegemini", "tailwindcss", "zod"]
githubUrl: "https://github.com/yoyojambo/demo-ia"
order: 4
---

### Project Overview
This agent was developed to solve the "reporting bottleneck" in corporate environments. Instead of waiting for IT to write custom SQL reports, users can simply ask: *"Show me all invoices from last month grouped by client."*

### Key Features
- **Natural Language to SQL**: Uses Gemini 3.5 via OpenRouter to generate complex SQL queries against an ERP schema.
- **Streaming NDJSON**: Results are streamed from a secure DB proxy, allowing the UI to show data as it arrives.
- **Persistence**: Reports are automatically saved to Cloudflare R2 for later retrieval and sharing.
- **Interactive UI**: Users can filter, sort, and export (CSV/PDF) the generated data directly in the chat.
