---
title: "Arbitrary code isolation in unprivileged containers"
description: "How I isolated code in my LeetCode clone"
pubDate: "Jun 16 2025"
heroImage: "/hacking-goof.gif"
draft: true
---

### TLDR

Taking on the challenge to make a LeetCode-like code challenge platform, I learned great
lessons regarding containerization, namespaces, and the Linux kernel's methods to manage
and isolate program environments.

Running arbitrary and possibly malicious code requires preemptive isolation and a
declarative, zero-trust limit to a program's access to operating system functions. The
challenge becomes greater in *Cloud Native* environments like containers, which will often
run unprivileged in the cloud, with a limited set of kernel
[capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html).

The limited set of kernel capabilities within a container narrows solutions to a subset of
userspace solutions, and WASM can be an almost perfect solution, but your mileage may vary.

---

The idea of making a LeetCode clone is not unique. Most developers will get exposed to
LeetCode, HackerRank or another similar platform in some way or another, and will also get
the idea of making a similar platform as a challenge. What each developer is looking to
learn from the challenge might decide what tools they use to achieve that goal.


## Why run arbitrary code

There are products like [Judge0](https://judge0.com/) that reduce arbitrary code execution
to a simple API, and that can be a perfectly valid approach, but constraints make
engineering, and I decided to explore precisely the side of systems engineering that
involved arbitrary code execution. I decided that **my** LeetCode clone should be able to
run by itself in any server, depending on **zero** external services or third party
services. This constraint by itself is not an insurmountable challenge, but it's the
*first* critical part of a more extreme challenge.

Sites like LeetCode or Hackerrank test the user's skills and knowledge of data structures
and algorithms, and favor the language-agnostic nature of these challenges by supporting a
decently long list of programming languages for submissions. This is the *second* critical
constraint, *language agnostic* code judging.

I found that it was deceptively difficult if you want your solution to run anywhere, with
minimal configuration, but it's also a worthwhile problem.


## Why containers

Containers revolutionized computing as a replicable, declarative platform for packaging
software. It is one of the most common ways to deploy modern applications. As a reasonable
constraint, I decided that *LameCode* had to be shipped as a container, so that anyone
could also make their own deployment and host their own code challenges.

This ended up driving me down an interesting path of the Linux kernel and container
isolation. Spoiler: What happens when `root` is not a **god user**?

### Why is this an issue?

Containers themselves are isolating a group of processes and their resources from
the host, but when your application runs within a container and it **needs** enforce similar
control over child processes, it has much less power to do so.

### How a container does it

A container is completely different in its approach to isolation compared to a *virtual
machine*. A virtual machine seeks to emulate **hardware**, it can be very advanced but it
sets clear boundaries of what *hardware capabilities* or features it exposes to whatever
software (a full operating system usually) runs on the emulated machine.

A container, on the other hand, never aims to reproduce an independent regular machine, it
is only isolating processes within a separate nested filesystem and network stack, while
controlling how much of the **host** machines's resources it's allowed to allocate and
consume. There is only a single Linux kernel managing real hardware, but many isolated
software processes that can share or isolate dependencies like libraries and compute
resources.

The tools that enable a Linux machine to create a virtual machine with minimal overhead
(like KVM) work entirely different from those that came later to enable containers. Google
pioneered *process containers* in the late 2000's as a holistic, lightweight, and
efficient alternative to VMs for isolation of their software needs. It's a *software*
implementation of the sufficient conditions of isolation and management of resources from
a single machine running a single Linux kernel. It relies on the kernel managing resource
access and resource rationing so applications can run the same, in environments that can be
infinitely replicated, without interfering with the environment of another application
running on the same machine and kernel.

The tools a container relies on are:
1. cgroups, for resource rationing. Limiting how much memory or CPU time a single process
   can consume.
2. namespaces. Defining and managing the environment within the program runs. This enables
   Docker's solution to dependency hell. Dependencies are nothing but files and services
   accessible from the right place at the right time for applications.
3. Filesystem and Network overlays. Integral parts of any software stack that have to be
   either emulated or carefully managed (by Docker or any other container platform) to be
   used to create this new environment that can neither be abused or misused by the
   containerized process.
   
### What this means to a "guest" process

The process running within a container runs in a software stack managed by the host
OS. Its network and filesystem stack is not necessarily emulated, but heavily managed and
translated so it does not violate access. For that same reason, even if all container
processes run on the "same" kernel, they do not share all capabilities of the kernel.

