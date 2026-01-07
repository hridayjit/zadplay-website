# Zadplay

Welcome to the Zadplay codebase! This project is built using **Astro** and **React**, featuring animations with **GSAP**.

## 🛠️ How to Access and Setup the Codebase

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **Git**

### 1. Clone the Repository

Open your terminal and clone the repository:

```bash
git clone <repository-url>
cd zadplay
```

### 2. Install Dependencies

Install the necessary packages using npm:

```bash
npm install
```

### 3. Run the Development Server

Start the local development server:

```bash
npm run dev
```

You can now access the app at `http://localhost:4321`.

## 📂 Project Structure

Here is a quick overview of the key directories:

```text
/
├── public/          # Static assets (images, fonts, etc.)
├── src/
│   ├── components/  # Reusable Astro and React components
│   ├── pages/       # Application routes (file-based routing)
│   └── logo/        # Project logo assets
└── package.json     # Project dependencies and scripts
```

## 🧞 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Builds the production site to `./dist/` |
| `npm run preview` | Previews the build locally |
| `npm run wip` | Quick commit script (git add, commit, push) |

## 📚 Tech Stack

- **Astro**: Web framework for content-driven websites.
- **React**: UI library for interactive components.
- **GSAP**: GreenSock Animation Platform for animations.
- **Vercel**: Deployment platform.
