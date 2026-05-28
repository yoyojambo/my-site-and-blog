---
title: "Patito Language"
description: "A strongly-typed, imperative programming language, full compiler pipeline, and stack-based virtual machine implemented from scratch in OCaml."
tools: ["ocaml", "linux"]
githubUrl: "https://github.com/yoyojambo/patito"
order: 5
---

### Project Overview
Patito is a custom, statically-typed imperative programming language built to explore the
mechanics of compiler optimization, semantic validation, and low-level runtime instruction
execution. The architecture spans from a lexical scanning frontend to a custom bytecode
format executed inside a native, custom-built virtual machine.

### Core Architecture
- **Language Design**: Features a structured, deterministic syntax optimized for clarity,
  with native Spanish keywords mapped directly to core operations.
- **Full Compiler Pipeline**: Built utilizing `sedlex` for deterministic lexical analysis
  and `Menhir` for LR parsing, synthesizing raw tokens into a fully validated Abstract
  Syntax Tree (AST).
- **Type Safety & Semantic Analysis**: Implements a rigorous semantic analysis pass over
  the AST, handling type checking across primitive types and strictly defining
  intermediate representations.
- **Custom Stack VM & Bytecode**: Features a custom-designed execution engine that
  transforms the intermediate AST into discrete linear instructions (quadruples) executed
  via an isolated stack-based virtual machine.
