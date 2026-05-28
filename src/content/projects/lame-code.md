---
title: "LameCode"
description: "A secure, lightweight code execution platform built from scratch in Go. It leverages sandboxed WebAssembly runtimes via Wasmtime to isolate and execute untrusted multi-language user submissions instantly."
tools: ["go", "htmx", "webassembly", "sqlite"]
githubUrl: "https://github.com/yoyojambo/lameCode"
order: 3
---

### Project Overview
LameCode is a high-performance code execution engine designed to mirror the multi-language
sandboxing behavior of online judging systems. The core engineering challenge was
executing untrusted user binaries securely, efficiently, and deterministically without
incurring the heavy container overhead or cold-start times of traditional Docker
isolation.

### Technical Highlights
- **WASM Sandboxing**: Every untrusted runtime submission isolates into an ephemeral,
  independent Wasmtime instance with strictly throttled CPU time slices and hard memory
  ceilings.
- **Zero-Javascript Architecture**: Utilizes Go, HTMX, and Templ to build a single-page
  application experience driven entirely by memory-efficient, server-side rendered state.
- **Dynamic Toolchain Compilers**: Features a background backend pipeline that handles
  multi-tenant compiler requests, converting C, C++, and Rust source arrays into
  WASI-compliant WebAssembly binaries on the fly.

### Supported Languages
- **C/C++**: via Emscripten toolchains
- **Rust**: compiled via the native `wasm32-wasi` target
- **Go**: compiled targeting TinyGo and standard Go web targets

![Two Sum UI Overview](/problema_lamecode.png)

Architected with infrastructure parity in mind; the system is natively cloud-ready and
fully containerized, optimized to scale microservices horizontally or run lightweight
standalone nodes on edge infrastructure.
