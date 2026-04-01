---
title: "Uni assignments with org-mode and LaTeX"
description: "My complete setup for making any document and assignment from within Emacs"
pubDate: "Mar 29 2026"
heroImage: "/hacking-goof.gif"
draft: true
---

I am by no means an expert in Emacs, org-mode, or LaTeX, but I have used them for some
time. I have learned many things about them over time that have enabled me to do my uni's
assignments completely within Emacs, right until I upload to Canvas the finished PDF. Here
are some of the most important tricks that I have made part of my workflow to never have
to leave the comforts of my Emacs while producing well formatted PDFs.

# Why org-mode?

I am not getting into everything you can do in org-mode, other people have done that much
better, but here is some of the stuff I do in org mode that I found useful for many classes:

1. Literate programming, or any other report-style deliverable with code and code results:
   * Executable code blocks in notes? org-mode.
   * Statistics course using R Studio? org-mode+ess.
   * Machine learning on Python Notebooks or Google Colab? org-mode.
   * Defining and explaining the schema for a database? org-mode.  
	 You can even run it as a script for migrations. (`C-c C-v b`)
2. Reports that rely heavily on diagrams with PlantUML. These can be edited and redone
   with each export, as code.
3. LaTeX documents, like for scientific publishing, can be done from the comforts of
   org-mode and then exported into world-class, beautifully formatted documents with
   bibtex and all.
   
If you *do* want to get to know what org mode offers, there is:

* [The Org Mode compact guide](https://orgmode.org/guide/) and [The Org Manual.](https://orgmode.org/org.html)
* [System Crafters](https://systemcrafters.net/guides/) has many great guides and videos.
* [Worg, the Org-Mode Community](https://orgmode.org/worg/) collects a lot of really cool
  stuff made by the comunity.
  
# The basics of an acceptable setup

You can export to any format from any .org file with the necessary tools (LaTeX, Beamer,
etc.). But the basic document format probably does not look good enough to 

```json
{
	"hello": "there"
}
```

asdasd
```go
fmt.Println("Lol")
```

```org
* headline 1
** headline 2
```
