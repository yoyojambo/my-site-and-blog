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

## Core Architecture
- **Language Design**: Features a structured, deterministic syntax optimized for clarity,
  with native Spanish keywords mapped directly to core operations.
- **Full Compiler Pipeline**: Built utilizing
  [sedlex](https://github.com/ocaml-community/sedlex) for deterministic lexical analysis
  and [Menhir](https://gallium.inria.fr/~fpottier/menhir/) for LR parsing, synthesizing
  raw tokens into a fully validated Abstract Syntax Tree (AST).
- **Type Safety & Semantic Analysis**: Implements a rigorous semantic analysis pass over
  the AST, handling type checking across primitive types and strictly defining
  intermediate representations.
- **IR & Custom VM**: Features a custom-designed execution engine that transforms the
  intermediate AST into discrete linear instructions (quadruples) executed via an isolated
  stack-based virtual machine.
  
## Design quirks

Some of these quirks are of my own choosing and some where part of the specifications of
the language given to me.

  1. Spanish keywords.
	 This is not a big deal really since there are <10 of them.
  2. `resultado` implicit variables.
  
  That is a big one, but I did it (in part) as a time saving measure during finals. All
  functions except those of type null have an implicit variable called `resultado` of the
  same type as the function, and at the end of the function's execution, its value will be
  the value of the expression. 
  
  It was inspired by [Nim's `result`
  variable](https://nim-by-example.github.io/variables/result/), but I might get around to
  creating a *return* keyword. It should be easy to add now that the pipeline is complete.
  
  3. Double set of parenthesis over functions.
  
  This might have been me being pedantic, but the language definition, as provided in a
  diagram, included accidentally two sets of parenthesis:
  
  ![Syntax diagram of a function definition](/diagrama_patito_FUNCS.png)
  
  My best guess is that the intention was to have one set of parenthesis that included the
  variable definitions and the statements, but since these diagrams define the statments:
  
  ![Syntax diagram for function statments](/diagrama_patito_CUERPO.png)
  
  `VARS` and `CUERPO` are within while `CUERPO` itself is just parenthesis and statements.
  
## Examples

#### Factorial - Recursive

```c
programa FactorialRecur;

entero factorialRecur(n : entero) {
  {
    si (n == 0) {
      resultado = 1;
    }
    sino {
      resultado = n * factorialRecur(n - 1);
    };
  }
};

inicio
{
  escribe("Factorial Recursivo de 5 es:", factorialRecur(5));
}
fin
```

A consequence of the `resultado` variable (and lack of return statement) is that there is
no early return that would allow for something like this:

```c
entero factorialRecur(n : entero) {
  {
    si (n == 0) {
      regresa 1;
    }
    regresa n * factorialRecur(n - 1);
  }
};
```

It would be a slightly more elegant and ergonomic solution.

#### Fibonacci - Iterative

``` c
programa FibonacciIter;
  vars a: entero;

entero fibonacciIter(n : entero) {
  vars
    a, b, temp, i : entero;
  {
    si (n < 2) {
      resultado = n;
    }
    sino {
      a = 0;
      b = 1;
      i = 2;
      mientras (i < n + 1) haz {
        temp = a + b;
        a = b;
        b = temp;
        i = i + 1;
      };
      resultado = b;
    };
  }
};

inicio
{
  a = 25;
  escribe("Fibonacci Iterativo de ", a, " es:", fibonacciIter(a));
}
fin
```

