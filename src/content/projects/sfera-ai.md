---
title: "Sfera AI Reporting Agent"
description: "An intelligent agent that transforms natural language into MS SQL queries for ERP systems. Features a real-time streaming UI, automated report persistence to Cloudflare R2, and voice-to-text integration via Groq Whisper."
tools: ["cloudflareworkers", "react", "googlegemini", "tailwindcss", "zod"]
order: 4
---
### Project Overview

As a contract for [SferaSoft](https://sferasoft.com/es/)'s ERP system, I developed, deployed and maintain an app
that serves as an extension to the funcions of the legacy native windows application. It
replicates its access and permission layer to offer a data exfiltration agent.

This agent was developed to solve the "reporting bottleneck" in corporate
environments. Instead of waiting for IT to write custom SQL reports or playing around with
the filter based interface, users can simply ask: 
> "Show me all invoices from last month grouped by client."

Besides the new functionality, this project is the begginning of a movement to a more
cloud-based direction for the company's products.

### Key Features
- **Natural Language to SQL**: Uses Gemini 3.5 via OpenRouter to generate complex SQL
  queries against an ERP schema.
- **Streaming NDJSON**: Results are streamed from a secure DB proxy, allowing the UI to
  show data as it arrives.
- **Persistence**: Reports are automatically saved to Cloudflare R2 for later retrieval
  and sharing.
- **Interactive UI**: Users can filter, sort, and export (CSV/PDF) the generated data
  directly in the chat.
