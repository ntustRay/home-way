"use client";
import { createAuthController, failure, success } from "@ntustray/web-authentication-component";
import { createHostedAdapter } from "@ntustray/web-authentication-component/adapters/hosted";
import { AuthButton, AuthProvider, useAuth } from "@ntustray/web-authentication-component/react";
import { useClerk } from "@clerk/nextjs";
import { type ReactNode, useRef, useState } from "react";

export function SharedAuth({ children }: { children: ReactNode }) {
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
  return <AuthProvider controller={controller} locale="en">{children}</AuthProvider>;
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
