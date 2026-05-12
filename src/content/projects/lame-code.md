---
title: "LameCode"
description: "A secure code execution platform built from scratch using Go. It leverages WebAssembly runtimes like Wasmtime to sandbox and run user submissions in multiple languages like C, C++, and Rust. The frontend is a snappy SPA experience built with HTMX and Templ."
tools: ["go", "htmx", "webassembly", "sqlite"]
githubUrl: "https://github.com/yoyojambo/lameCode"
liveUrl: "https://lamecode.yoyojambo.com"
order: 3
---

### Project Overview
LameCode was born out of a desire to understand how online judges (like LeetCode) work under the hood. The primary challenge was executing untrusted code safely without the overhead of heavy Docker containers.

### Technical Highlights
- **WASM Sandboxing**: Every submission runs in its own Wasmtime instance with limited memory and CPU.
- **HTMX Integration**: The entire application feels like a modern SPA but is powered entirely by server-side Go templates.
- **Local Toolchains**: It intelligently detects and uses local compilers to transform source code into WebAssembly.

### Supported Languages
- **C/C++**: via Emscripten
- **Rust**: via `wasm32-wasi` target
- **Go**: via TinyGo or the standard Go compiler
