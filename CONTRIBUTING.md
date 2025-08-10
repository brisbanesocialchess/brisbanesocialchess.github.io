# Contributing Guide ✨

Welcome to **Awesome Social Chess**! We appreciate your interest in contributing. All contributions are welcome! 💖

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting Started](#getting-started)
- [Creating an Issue](#creating-an-issue)
- [How to Contribute](#how-to-contribute)
  - [1. Fork the Repository 🔗](#1-fork-the-repository-)
  - [2. Clone Your Fork 📥](#2-clone-your-fork-)
  - [3. 🌿 Create a Branch](#3--create-a-branch)
  - [4. ✏️ Make Changes](#4--make-changes)
  - [📐 Formatting & Commit Rules](#-formatting--commit-rules)
    - [🔧 Setting Up dprint](#-setting-up-dprint)
    - [🧪 Setting Up pre-commit](#%F0%9F%A7%AA-setting-up-pre-commit)
  - [5. 📝 Commit Changes](#5--commit-changes)
  - [6. ⬆️ Push Changes](#6--push-changes)
  - [7. 🔄 Create a Pull Request](#7--create-a-pull-request)
- [Community Support](#community-support)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

## Getting Started

Before you begin:

- **Familiarize Yourself**: Take a moment to read through the existing [issues](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/issues) and [pull requests](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/pulls) to understand current discussions.

## Creating an Issue

If you encounter a bug or have a feature request, please create an issue:

- **Search Existing Issues**: Check if the issue already exists to avoid duplicates.
- **Open a New Issue**:
  - Use a descriptive title.
  - Clearly describe the problem or feature request.
  - Provide steps to reproduce the issue, if applicable.
  - Include screenshots or code snippets, if helpful.

## How to Contribute

We welcome contributions in the form of bugfixes, new features, documentation improvements, and more.

### 1. Fork the Repository 🔗

Click the **"Fork"** button at the top right corner of the repository page to create a copy of the repository on your GitHub account.

### 2. Clone Your Fork 📥

Clone the forked repository to your local machine:

```bash
git clone https://github.com/your-username/brisbanesocialchess.github.io.git
```

### 3. 🌿 Create a Branch

```bash
cd brisbanesocialchess.github.io
git checkout -b add-new-feature
```

### 4. ✏️ Make Changes

Make necessary improvements, such as fixing bugs, enhancing documentation, or adding new features.

---

### 📐 Formatting & Commit Rules

Before committing, please make sure your code follows our formatting and line-ending standards.

We use:

- [**dprint**](https://dprint.dev) for consistent code formatting
- [**pre-commit**](https://pre-commit.com) for checking **end-of-file** and **line endings (LF/CRLF)**

#### 🔧 Setting Up dprint

**Windows:**

- Download and install dprint from the [dprint releases](https://github.com/dprint/dprint/releases)
- Run the installer and make sure `dprint` is in your system PATH

**Linux/macOS:**

Install via curl:

```bash
curl -fsSL https://dprint.dev/install.sh | sh
```

**To check code without changing files:**

```bash
dprint check --allow-no-files
```

**To auto-format code:**

```bash
dprint fmt --allow-no-files
```

Our configuration is already in the repo: [dprint.json](./dprint.json)

---

#### 🧪 Setting Up pre-commit

We use [pre-commit](https://pre-commit.com/) to automatically check your code for common issues, like missing end-of-file newlines and inconsistent line endings. This keeps our project clean and easy for everyone to work on.

**How to install (requires Python):**

```bash
python -m pip install --user pre-commit
```

**Set up pre-commit hooks for this project:**

```bash
pre-commit install
```

This will make pre-commit run its checks every time you make a commit.
**Running checks manually (optional):**

```bash
pre-commit run --all-files
```

This command runs all configured pre-commit hooks against all files in the repository.
For more info, visit the [pre-commit website](https://pre-commit.com/).

---

### 5. 📝 Commit Changes

Use meaningful and clear commit messages that describe the purpose of your changes. This helps maintain a clean and understandable project history.

**Example of staging and committing changes:**

```bash
git add .
git commit -m "Add feature: description of feature"
```

### 6. ⬆️ Push Changes

Push your local branch to your remote fork. Replace `your-branch-name` with the name of your current branch.

```bash
git push origin add-new-feature
```

This makes your changes available for review and merging via a Pull Request.

### 7. 🔄 Create a Pull Request

- Go to your forked repository on GitHub.
- Click the **"Compare & pull request"** button near the top of the page.
- Make sure your changes look correct and you are merging into the right branch.
- Write a clear and simple title describing your changes.
- Add a short description explaining what you changed and why. If it fixes an issue, mention it like this: `Fixes #issue-number`.
- Click **"Create pull request"** to submit your contribution.
- Watch for feedback on your Pull Request and respond to any comments.

---

## Community Support

If you need help or have questions:

- Join Discussions: Participate in ongoing discussions with the community.
- Contact Maintainers: Reach out to project maintainers if you need direct assistance.
