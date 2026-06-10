import { redirect } from "next/navigation";

// Auth is passwordless (email OTP + Google/Apple) — sign-up and sign-in are the
// same flow, so /signup just sends users to the unified entry point.
export default function SignupPage() {
  redirect("/login");
}
