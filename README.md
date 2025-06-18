# Pixel Perfect

Pixel Perfect is a modern, full-stack blog and learning platform built with **Next.js**, **Prisma**, and **Clerk** authentication. It features a beautiful dark UI with purple accents, mobile responsiveness, and a focus on both content creation and interactive learning tracks.


## Features

### 🚀 Home & Articles
- **Landing Page:** hero, skills, and study plan sections.
- **Articles:** Browse and read articles with rich formatting and images.
- **Article Detail:** Modern, readable layout with author info, like button, and a YouTube-style comment section.
- **Commenting:** Authenticated users can comment, like comments, and see avatars.

### 🏆 Learning Tracks & Progress
- **User Dashboard:** Choose from curated learning tracks (Web, Android, CP), view progress, and access personalized roadmaps.
- **Track Pages:** Interactive modules and items, with progress persistence and completion toggles.
- **Progress Tracking:** Progress is saved and synced with the backend for each user.

### 🛠️ Admin Dashboard
- **Article Management:** Create, edit, and delete articles with a modern UI.
- **Track Management:** Create, edit, and organize learning tracks and modules.
- **Mobile Responsive:** All admin pages are fully responsive and visually consistent.

### 👤 User Features
- **Profile & Stats:** View your liked articles, comments, and progress.
- **Commented Articles:** See all articles you've commented on, with quick navigation.

### 🔒 Authentication
- **Clerk Integration:** Secure sign-in/sign-up with Clerk.
- **Role-based Access:** Admin and user roles for protected routes.

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, Lucide Icons
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL
- **Auth:** Clerk
- **UI:** Radix UI, custom components, dark theme with purple gradients
- **Other:** Cloudinary (images), Zod (validation)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your database and Clerk credentials.

3. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

```
actions/         # Server actions (CRUD, search, like, etc.)
app/             # Next.js app directory (routing, pages, API)
components/      # UI and feature components (articles, dashboard, comments, etc.)
lib/             # Auth, Prisma, and utility functions
prisma/          # Prisma schema and migrations
public/          # Static assets and images
types/           # TypeScript global types
utils/           # Utility functions (roles, motion, etc.)
```

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

## License

[ISC](LICENSE)

---

**Pixel Perfect** — A beautiful, modern platform for learning and sharing knowledge.
