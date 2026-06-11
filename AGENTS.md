<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Package manager

Use **pnpm**, never npm or yarn: `pnpm install`, `pnpm build`, `pnpm dev`, `pnpm dlx` (instead of npx). The lockfile is `pnpm-lock.yaml` — never create or commit `package-lock.json`.
