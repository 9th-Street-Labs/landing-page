import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/api";
import { ProfileForm } from "@/components/dashboard/ProfileForm";

export const metadata: Metadata = { title: "Settings — 9st Whip" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile = await getProfile();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your profile and account.</p>
      </div>

      <section className="rounded-2xl border border-line bg-surface-2/40 p-5">
        <h2 className="mb-4 text-sm font-semibold">Profile</h2>
        <ProfileForm
          initialName={profile?.displayName ?? ""}
          initialAvatar={profile?.avatarUrl ?? ""}
        />
      </section>

      <section className="rounded-2xl border border-line bg-surface-2/40 p-5">
        <h2 className="mb-4 text-sm font-semibold">Account</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-faint">Email</dt>
            <dd className="text-foreground">{user?.email}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-faint">Member since</dt>
            <dd className="text-foreground">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-line bg-surface-2/40 p-5">
        <h2 className="text-sm font-semibold">Sign out</h2>
        <p className="mt-1 text-sm text-muted">Sign out of 9st Whip on this browser.</p>
        <form action="/auth/signout" method="post" className="mt-4">
          <button
            type="submit"
            className="rounded-full border border-line-strong px-5 py-2.5 text-sm transition-colors hover:border-foreground/40"
          >
            Sign out
          </button>
        </form>
      </section>
    </div>
  );
}
