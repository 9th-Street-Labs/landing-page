import type { Metadata } from "next";
import { getDailyUsage } from "@/lib/api";
import { buildCalendar, totals } from "@/lib/usage";

export const metadata: Metadata = { title: "Billing — 9st Whip" };

// Plan catalog. Wire `priceId` + a Stripe Checkout/Portal route as the fast-follow;
// the UI is already shaped for it.
const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "For trying Whip across your own machines.",
    features: ["Unlimited desktop mesh", "1 phone", "60 voice min / mo", "Community support"],
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$8",
    cadence: "/ month",
    blurb: "For driving agents all day, every day.",
    features: ["Everything in Free", "Unlimited phones + remotes", "Unlimited voice", "Priority support"],
    highlight: true,
  },
  {
    id: "team",
    name: "Team",
    price: "Custom",
    cadence: "",
    blurb: "For labs and teams running fleets of agents.",
    features: ["Everything in Pro", "Shared device pool", "SSO (soon)", "Dedicated support"],
    highlight: false,
  },
] as const;

const CURRENT_PLAN = "free";

export default async function BillingPage() {
  const daily = await getDailyUsage(365);
  const { cells } = buildCalendar(daily);
  const t = totals(cells);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Billing</h1>
        <p className="mt-1 text-sm text-muted">Manage your plan and see what you&apos;ve used.</p>
      </div>

      {/* current plan + usage */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2/40 px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-faint">Current plan</p>
          <p className="mt-1 text-lg font-semibold capitalize">{CURRENT_PLAN}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-faint">Voice this period</p>
          <p className="mt-1 text-lg font-semibold">{t.sttMinutes}m</p>
        </div>
        <button
          disabled
          title="Stripe billing portal — coming soon"
          className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-muted opacity-60"
        >
          Manage billing (soon)
        </button>
      </div>

      {/* plan grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map((plan) => {
          const current = plan.id === CURRENT_PLAN;
          return (
            <div
              key={plan.id}
              className={`flex flex-col rounded-2xl border p-5 ${
                plan.highlight ? "border-accent/50 bg-accent/[0.04]" : "border-line bg-surface-2/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{plan.name}</h3>
                {plan.highlight && (
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-2">
                <span className="text-2xl font-semibold">{plan.price}</span>{" "}
                <span className="text-sm text-faint">{plan.cadence}</span>
              </p>
              <p className="mt-2 text-sm text-muted">{plan.blurb}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-muted">
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>
              <button
                disabled
                className={`mt-5 rounded-full px-4 py-2.5 text-sm font-medium ${
                  current
                    ? "border border-line-strong text-muted"
                    : plan.highlight
                      ? "bg-accent text-white opacity-60"
                      : "border border-line-strong text-muted opacity-60"
                }`}
              >
                {current ? "Current plan" : "Upgrade (soon)"}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-faint">
        Payments are coming soon. You won&apos;t be charged until you choose a paid plan.
      </p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0 text-accent">
      <path d="M5 12l5 5L20 6" />
    </svg>
  );
}
