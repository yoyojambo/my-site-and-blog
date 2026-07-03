---
title: "Arbitrary code isolation in unprivileged containers"
description: "How I isolated code in my LeetCode clone"
pubDate: "Jul 2 2026"
heroImage: "/hacking-goof.gif"
draft: false
---

> Note: I started writing this post back in june 2025, but never had the guts to
> publish it. I think I am ready to share it, so here it is. Enjoy.

### Abstract

I challenged myself to make a LeetCode clone, a simple code challenge platform. I learned
a great deal about containerization, namespaces, and other Linux kernel's tools to
manage and isolate program environments and resources.

I tried to build safe arbitrary-code execution inside unprivileged containers, learned
where Linux/container isolation becomes a constraint, and ended up using WASM as the
sandbox boundary.

Running arbitrary and possibly malicious code requires preemptive isolation and a
declarative, zero-trust limit to a program's access to operating system functions. The
challenge becomes greater in *Cloud Native* environments like containers, which will often
run unprivileged in the cloud, with a limited set of kernel
[capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html).

The limited set of kernel capabilities within a container narrows solutions to a subset of
userspace solutions, and WASM can be an almost perfect solution, but your mileage may vary.


## Why run arbitrary code

There are products like [Judge0](https://judge0.com/) that reduce arbitrary code execution
to a simple API, and that can be a perfectly valid approach, but **constraints make
engineering**.  I wanted the reference implementation and deployment of this project to be
entirely self-sufficient. This constraint by itself is not an insurmountable challenge,
but it's the first half of a more extreme challenge.

Platforms like LeetCode or Hackerrank test the user's skills and knowledge of data
structures and algorithms, and favor the language-agnostic nature of these challenges by
supporting a decently long list of programming languages for submissions. This is the
second critical constraint, *language agnostic* code judging.

I found that it was deceptively difficult if you want your solution to run anywhere, with
minimal configuration, but it's also a worthwhile problem.

## Why containers

Containers revolutionized computing as a replicable, declarative platform for packaging
software. It is one of the most common ways to deploy modern applications. As a reasonable
constraint, I decided that *LameCode* had to be shipped as a container, so that anyone
could also make their own deployment and host their own code challenges. This does not
mean that you cannot deploy LameCode natively, but it is not the focus of the reference
implementation and deployment.

This ended up driving me down an interesting path of the Linux kernel and container
isolation. Spoiler: What happens when `root` is not a **god user**?

## Why this is an issue

Containers themselves are isolating a group of processes and their resources from the
host, but access to those tools is not nested in most fully managed environments or
default configurations. That means when your application runs within a container and it
needs to enforce similar control over child processes, it has much less power to do so.

### How a container does it

> Note: If you want to know more, there are many people that have already explained this
> better than I ever could. 
> 
> I recommend [this timeless talk by Liz Rice](https://youtu.be/Utf-A4rODH8 "youtube.com:
> Building a container from scratch in Go - Liz Rice") if you want a practical approach to
> understanding what makes Docker tick, but there is also [Michael Kerrisk's series on the
> user namespaces API](https://lwn.net/Articles/531114/ "LWN.net: Namespaces in operation,
> part 1: namespaces overview") if you are interested on the kernel API itself.


A container is a completely different approach to isolation compared to a *virtual
machine*. A virtual machine seeks to emulate **hardware**, it can be very advanced but it
sets clear boundaries of what *hardware capabilities* or features it exposes to whatever
software (a full operating system usually) runs on the emulated machine.

A container never really runs software like an independent *alien* machine, it is only
logically isolating processes within a separate nested filesystem and network stack, while
controlling how much of the **host** machines's resources it's allowed to allocate and
consume. There is only a single Linux kernel managing real hardware, but any number of
software processes that can share or limit access to dependencies like libraries and compute
resources with their children.

The tools a container relies on are:
1. **cgroups**, for resource rationing. Limiting how much memory or CPU time a single
   process can consume.
2. **namespaces**. Defining and managing the environment within the program runs. This
   enables Docker's solution to dependency hell. Dependencies are nothing but files and
   services accessible from the right place at the right time for applications.
3. Filesystem and Network **overlays**. Integral parts of any software stack that have to
   be either emulated or carefully managed (by Docker or any other container platform) to
   be used to create this new environment that can neither be abused or misused by the
   containerized process.
   
### The tradeoff

Before executing a program withing these namespaces, the processes of the container lose
access to [kernel capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html
"Manual page for kernel capabilities") that they do not need. These restrictions enable
true isolation from the host system, running the container's processes natively while
removing them any tools to wreak havoc on the host. You cannot mount new filesystems,
cannot configure network interfaces or sniff packets, load or unload kernel modules.

You can think of these "capabilities" as a more fine-grained control system than just
root/not-root, as it is described in the [Docker security
docs](https://docs.docker.com/engine/security/). Since all processes inside the container
have their filesystem, network, and resources set up for them, this is not a problem for
most applications.

You can add back these capabilities when you execute processes:
```sh
docker run --cap-add=SYS_ADMIN -it ubuntu:latest bash
```

But doing so opens the floodgates, so containers are rarely deployed "privileged". In
fully managed environments like [AWS ECS](https://aws.amazon.com/ecs/) or
[Sevalla](https://sevalla.com/application-hosting/) your app will never run in containers
with any capabilities added back on.

## What this meant for LameCode

This meant tools like `nsjail`, `firejail`, and even `docker` itself were not an
option. These tools could be used to create viable and highly performant implementations
of LameCode, if cloud containers where not a necessary target. Running natively the
programs made by user's would have been a great improvement.

Some ideas I played with when making LameCode where:
1. GraalVM, which has interpreters for Python, JavaScript, Ruby, etc. and can sandbox them
   natively just like with WebAssembly. I still might add this as an extension.
3. V8 Isolates: Like Cloudflare Workers, I could have used V8 Isolates to run JavaScript
   natively. Of course, that would only allow JS to run natively, anything else is still
   WebAssembly.
   
At the end of the day, there are many options, but they all trade speed, security,
language support and the environment requirements.

| Technology                   | Core Mechanism                                             | Unprivileged Container Compatibility                                                                                      |
|------------------------------|------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| WebAssembly (Wasmtime)       | Software Fault Isolation (SFI) via user-space compilation. | Runs entirely inside the host process's standard virtual memory (mmap). Requires zero kernel privileges.                  |
| V8 Isolates                  | Process heap isolation within a single OS thread.          | Spins up independent JS/TS runtime contexts entirely in user-space memory.                                                |
| GraalVM (Truffle)            | Managed language contexts inside a JVM process.            | Enforces security boundaries via Java heap reference checks. Completely agnostic to OS privileges.                        |
| Seccomp-bpf Jailers          | OS-level system call filtering.                            | Dropping new filters or creating isolated user namespaces typically requires CAP_SYS_ADMIN, which is stripped by default. |
| Linux MicroVMs (Firecracker) | Hardware virtualization via KVM hypervisor.                | Strictly requires access to the host's /dev/kvm device node, which is inaccessible without root/privileged access.        |
| gVisor (runsc)               | User-space kernel system call interception.                | Virtualizing the guest OS environment requires low-level kernel hooks (ptrace) blocked in strict containers.              |

Judging could be generalized into an API that can be extended to allow any number of
methods, including third-party API's, to do the execution of user solutions. I might do
that later.

# End result

I had a blast making the simple pipeline for checking known compilers and making them
available to execute solutions. The LameCode experiment was a success, and I will later
come back to give it some love.

![Screenshot of Two Sum solved in LameCode](/problema_lamecode.png)

