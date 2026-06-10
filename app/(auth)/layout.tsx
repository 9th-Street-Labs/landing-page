import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" aria-label="Home" className="mb-10">
        <Wordmark className="text-xl" />
      </Link>
      {children}
      <p className="mt-10 text-xs text-faint">
        © {new Date().getFullYear()} 9th Street Labs
      </p>
    </main>
  );
}
