import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterForm({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign up</h1>
      <p className="text-sm text-foreground">
        Already have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-in">
          Sign in
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password (min. 6 characters)"
          minLength={6}
          required
        />
        <SubmitButton
          formAction={signUpAction}
          className="w-full"
          pendingText="Creating account..."
        >
          Create account
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
