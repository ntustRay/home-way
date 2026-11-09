"use client";
import { SignOutButton, useAuth } from "@ntustray/web-authentication-component/react";
export default function SignOutLink() {
  const { state } = useAuth();
  return <div>
    <SignOutButton className="w-full text-left">Logout</SignOutButton>
    {state.operation.error && <p role="alert">Logout could not be completed. Please try again.</p>}
  </div>;
}
