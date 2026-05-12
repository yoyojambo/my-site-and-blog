---
title: "Arbitrary code isolation in unprivileged containers"
description: "How I isolated code in my LeetCode clone"
pubDate: "Jun 16 2025"
heroImage: "/hacking-goof.gif"
draft: true
---

### TLDR

Running arbitrary and possibly malicious code requires preemptive isolation and a
declarative, zero-trust limit to a program's access to operating system functions. The
challenge becomes greater in Cloud Native environments like containers, which will often
run unprivileged in the cloud, with a limited set of kernel
[capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html).

The limited set of kernel capabilities within a container narrows solutions to a subset of
userspace solutions, and WASM can be an almost perfect solution, but your milage may vary.

---

# Why?

## Why run arbitrary code
Sites like LeetCode or Hackerrank test the user's skills and knowledge of data structures
and algorithms, and favor the language-agnostic nature of these challenges by supporting a
decently long list of programming languages for submissions.

I wanted to make my own LeetCode clone from the ground up, which is mostly normal web
engineering until you reach the judge. If you want to let users run arbitrary code on your
infrastructure, everything changes.  I found that it was deceptively difficult if you want
your solution to run anywhere, with minimal configuration, but it's also a worthwhile
problem.


## Why containers

Containers revolutionized computing as a replicable, declarative platform for packaging
software. It is one of the most common ways to deploy modern applications. As a reasonable
constraint (I thought), I decided that *LameCode* had to be shipped as a container, so
that anyone could also make their own deployment and host their own code challenges.

This ended up driving me down an interesting path of the Linux kernel and container
isolation.

# What is the issue?

Containers themselves are isolating a group of processes and their resources from
the host, but when your application runs within a container and it **needs** enforce similar
control over child processes, it has much less power to do so.

## How a container does it

A container with a "normal" set of capabilities is created with kernel namespaces, cgroups
and 

