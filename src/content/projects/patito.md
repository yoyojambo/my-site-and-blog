---
title: "Patito Language"
description: "A custom imperative programming language and VM implemented in OCaml. Developed as a compilers course project, it features structured syntax with Spanish keywords, a recursive descent parser, and a custom bytecode interpreter."
tools: ["ocaml", "linux"]
githubUrl: "https://github.com/yoyojambo/patito"
order: 5
---

### Project Overview
Patito is a toy language designed to learn the fundamentals of compiler theory. It transitions from high-level Spanish-like syntax to a custom intermediate representation, finally executing on a stack-based virtual machine.

### Features
- **Spanish Syntax**: Built to be accessible for native Spanish speakers (e.g., `programa`, `si`, `mientras`).
- **Full Compiler Pipeline**: Lexical analysis (OCamllex), Parsing (Menhir), AST generation, and Semantic analysis.
- **Virtual Machine**: A custom VM that handles quadruple generation, memory management, and execution.
- **Strongly Typed**: Implements basic type checking for integers, floats, and booleans.
