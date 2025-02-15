# Next.js Starter Template

This is a Next.js starter template with a full setup, including ESLint, Prettier, Tailwind CSS with plugins, Radix UI, theme switching, Drizzle ORM with PostgreSQL (via Docker), and authentication using BetterAuth (Email/Password with verification and reset password, plus GitHub OAuth).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Component**: [radix-ui](https://www.radix-ui.com)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **authentication**: [better-auth](https://www.better-auth.com/)
- **Form**: [react-hook-form](https://react-hook-form.com/)
- **Validation**: [zod](https://zod.dev/)


## Getting Started

```bash
git clone https://github.com/RedaKadri/next-template.git
cd next-template

npm install

cp .env.example .env # Update the .env file with your credentials.

docker compose up

npm run db:push

npm run dev
```

