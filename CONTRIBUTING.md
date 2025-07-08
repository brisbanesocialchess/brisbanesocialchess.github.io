# Contributing Guide ✨

Welcome to **Awesome Social Chess**! We appreciate your interest in contributing. All contributions are welcome! 💖

## Table of Contents

- [Getting Started](#getting-started)
- [Creating an Issue](#creating-an-issue)
- [How to Contribute](#how-to-contribute)
  - [Formatting & Commit Rules](#-formatting--commit-rules)
- [Community Support](#community-support)

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
dprint check
```

**To auto-format code:**

```bash
dprint fmt
```

Our configuration is already in the repo: [dprint.json](./dprint.json)

---

#### 🧪 Setting Up pre-commit

Used to enforce newline at end of files and OS-specific line endings.

**Install (requires Python):**

```bash
pip install pre-commit
```

**Activate pre-commit hooks:**

```bash
pre-commit install
```

**Run manually (optional):**

```bash
pre-commit run --all-files
```

---

### 5. 📝 Commit Changes

Use descriptive commit messages that clearly state the purpose of your changes.

```bash
git add .
git commit -m "Add feature: description of feature"
```

### 6. ⬆️ Push Changes

```bash
git push origin add-new-feature
```

### 7. 🔄 Create a Pull Request

- Go to your forked repository on GitHub.
- Click **"Compare & pull request"**.
- Add a title and description (e.g., "Fixes #102").
- Click **"Create pull request"**.

---

## Community Support

If you need help or have questions:

- Join Discussions: Participate in discussions.
- Contact Maintainers: Reach out to project maintainers if needed.
