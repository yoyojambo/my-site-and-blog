---
title: "Arbitrary code isolation in unprivileged containers"
description: "How I isolated code in my LeetCode clone"
pubDate: "Jun 16 2025"
heroImage: "/hacking-goof.gif"
---

#### TLDR

Running arbitrary and possibly malicious code requires preemptive isolation and a
declarative limit to a program's access to operating system functions. The challenge
becomes greater in Cloud Native environments like Docker containers, which will often
run unprivileged in the cloud. 

The limited set of kernel capabilities while running in a container requires turning to
userspace solutions, and WASM can be the perfect solution, but your milage may vary.

--- 

## The situation

A LeetCode-like app is not particularly challenging, you can think of its most
fundamental functions as the following:

1. "Content" management: the code challenges and their tests. It does not matter if
   those tests are static input/output pairs or run code to evaluate, they are the
   actual content of the site.
2. User account management.
3. Statistics and progress, possibly comparing them in leaderboards.
4. Code judging and measuring.

Code challenges tests the user's skills and knowledge of data structures and
algorithms, the language-agnostic nature of these challenges means most sites like
LeetCode or Hackerrank support a long list of programming languages for submissions.

The biggest challenge in an application like this becomes the judging of challenges,
and I found that it was deceptively difficult if you want your solution to run
anywhere, with minimala configuration.

## The problem

Containers revolutionized computing with 
