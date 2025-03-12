import { createFileRoute, redirect } from "@tanstack/react-router";
import { type ComponentProps } from "react";
import authClient from "~/lib/auth-client";
import { Button } from "~/lib/components/ui/button";
import { cn } from "~/lib/utils";

const REDIRECT_URL = "/posts";

export const Route = createFileRoute("/signin")({
  component: AuthPage,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/users",
      });
    }
  },
});

function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8 rounded-xl border bg-card p-10">
        Logo here
        <div className="flex flex-col gap-2">
          <SignInButton
            provider="discord"
            label="Discord"
          />
          <SignInButton
            provider="github"
            label="GitHub"
          />
          <SignInButton
            provider="google"
            label="Google"
          />
        </div>
      </div>
    </div>
  );
}

interface SignInButtonProps extends ComponentProps<typeof Button> {
  provider: "discord" | "google" | "github";  
  label: string;
}

function SignInButton({
  provider,
  label,
  ...props
}: SignInButtonProps) {
  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider,
          callbackURL: REDIRECT_URL,
        })
      }
      type="button"
      variant="outline"
      size="lg"
      className={cn("text-white hover:text-white")}
      {...props}
    >
      Sign in with {label}
    </Button>
  );
}
