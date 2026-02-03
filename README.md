# 🚀 Roaster App (Roster System)

A **Next.js 15** full-stack application built with **TypeScript**, **Chakra UI**, **Drizzle ORM**, **TanStack React Query**, and **Dnd-Kit**. The project provides a modern staff scheduling and rostering system backed by **PostgreSQL**, with a rich drag-and-drop calendar planner.

---

## 📦 Tech Stack

- **Framework:** Next.js 15.5.3 (App Router + Turbopack)
- **Language:** TypeScript
- **UI Library:** Chakra UI + Tailwind CSS
- **Drag & Drop:** Dnd-Kit
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **State & Data Fetching:** TanStack React Query
- **Forms & Validation:** Formik + Yup
- **Icons:** Phosphor Icons, Lucide React, Iconsax
- **Package Manager:** pnpm

---

## ⚙️ Prerequisites

Before running the app locally, install:

- **Node.js v18+**
- **pnpm**
- **PostgreSQL**

---

## 🛠️ Quick Setup

```bash
# Install pnpm (if not installed)
npm install -g pnpm
# macOS alternative:
brew install pnpm

# Clone the repo
git clone https://github.com/jettechnologies/roaster-test.git
cd roaster-test

# Install dependencies
pnpm install

# Create .env file and add:
# DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/roaster_db"

# Setup database
pnpm run db:generate
pnpm run db:push
pnpm run db:seed      # optional
pnpm run db:studio    # optional (GUI for DB)

# Start development server
pnpm run dev
pnpm run dev         # Start development server
pnpm run build       # Build for production
pnpm run start       # Run production build

pnpm run db:generate # Generate Drizzle schema
pnpm run db:push     # Push schema to database
pnpm run db:studio   # Open Drizzle studio
pnpm run db:seed     # Seed database

```

## Project structure

roaster-test/
├── src/
│ ├── app/ # Next.js App Router
│ ├── components/ # UI & shared components
│ ├── db/ # Drizzle schema & seed
│ ├── hooks/ # Custom React hooks
│ ├── services/ # API & React Query logic
│ ├── styles/ # Tailwind & global styles
│ └── utils/ # Helpers
├── public/
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
