"use client";
import { createAuthController, failure, success } from "@ntustray/web-authentication-component";
import { createHostedAdapter } from "@ntustray/web-authentication-component/adapters/hosted";
import { AuthButton, AuthProvider, AuthStatus, useAuth } from "@ntustray/web-authentication-component/react";
import { useClerk } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";

export function SharedAuth({ children, userId }: { children: ReactNode; userId: string | null }) {
  const clerk = useClerk();
  const sdk = useRef(clerk);
  sdk.current = clerk;
  const [controller] = useState(() => createAuthController({
    requireVerifiedEmail: false,
    methods: { password: false, registration: false, recovery: false, verification: false, providers: [{ id: "login", label: "Login" }, { id: "signup", label: "Sign Up" }] },
    adapter: createHostedAdapter({
      async verifySession() {
        const response = await fetch("/api/auth/session", { cache: "no-store", credentials: "same-origin" });
        if (!response.ok) return failure("unavailable");
        return success(await response.json());
      },
      async openSignIn(provider) {
        if (provider === "signup") sdk.current.openSignUp();
        else sdk.current.openSignIn();
      },
      async signOut() {
        await sdk.current.signOut();
        window.location.assign("/");
      },
      watchSession(listener) {
        let previous: string | null | undefined;
        return sdk.current.addListener(({ session }) => {
          const id = session?.id ?? null;
          if (id !== previous) { previous = id; listener(); }
        });
      },
    }, ["login", "signup"]),
  }));
  return <AuthProvider controller={controller} locale="en"><SessionContent userId={userId}>{children}</SessionContent></AuthProvider>;
}

export function AccountVisibility({ signedIn, children }: { signedIn: boolean; children: ReactNode }) {
  const { state } = useAuth();
  if (state.status === "checking") return null;
  return (state.status === "authenticated") === signedIn ? children : null;
}
export function AccountButton({ provider, children }: { provider: "login" | "signup"; children: ReactNode }) {
  const { state, signInWithProvider, clearFeedback, refresh, cancelRedirect } = useAuth();
  const pending = state.operation.phase === "pending" || state.operation.phase === "settling";
  return <div>
    <AuthButton className="w-full text-left" pending={pending} onClick={() => { clearFeedback(); void signInWithProvider(provider); }}>{children}</AuthButton>
    {state.operation.phase === "redirecting" && <button type="button" onClick={() => { void cancelRedirect(); }}>Close sign-in</button>}
    {state.operation.error && <p role="alert">Sign-in could not be completed. Please try again.</p>}
    {state.status === "unavailable" && <button type="button" onClick={() => { void refresh(); }}>Retry</button>}
  </div>;
}

function SessionContent({ userId, children }: { userId: string | null; children: ReactNode }) {
  const { state } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const id = state.session?.user.id ?? null;
  const privatePage = /^\/(bookings|checkout|favorites|profile|rentals|reviews)(\/|$)/.test(pathname);
  useEffect(() => {
    if ((state.status === "authenticated" || state.status === "anonymous") && id !== userId) router.refresh();
  }, [state.status, id, userId, router]);
  if (privatePage && (state.status !== "authenticated" || id !== userId)) return <AuthStatus />;
  return children;
}
