"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginType } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { replace } = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(formData: LoginType) {
    const supabase = createClient();
    const { email, password } = formData;

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          toast.error("Sign up failed.", {
            description: "We couldn't create your account. Please try again.",
          });
          return;
        }

        if (data.user && !data.session) {
          toast.warning("Account already exists.", {
            description:
              "This email is already registered. Please sign in instead.",
          });
          setIsSignUp(false);
          return;
        }

        toast.success("Account created!", {
          description: "Check your inbox for the confirmation link.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          toast.error("Sign in failed.", {
            description: "Incorrect email or password. Please try again.",
          });
          return;
        }

        toast.success("Signed in successfully.", {
          description: "Redirecting to your dashboard...",
        });

        replace("/dashboard");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Sign up/in failed.", {
        description: "An unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <section className="relative">
      <Form {...form}>
        <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <Link
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  {isSignUp ? (
                    <UserPlus className="size-8" />
                  ) : (
                    <LogIn className="size-8" />
                  )}
                </div>
                <span className="sr-only">Nexletter.</span>
              </Link>
              <h2 className="text-xl font-bold">Welcome to Nexletter.</h2>
              <FieldDescription>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <Button
                  type="button"
                  variant={"ghost"}
                  disabled={isSubmitting}
                  onClick={() => setIsSignUp((prev) => !prev)}
                >
                  {isSignUp ? "Sign In instead" : "Sign Up"}.
                </Button>
              </FieldDescription>
            </div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Field>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : isSignUp ? (
                  "Sign Up"
                ) : (
                  "Sign In"
                )}
              </Button>
            </Field>
            <FieldSeparator>Or</FieldSeparator>
            <Field className="grid gap-4 sm:grid-cols-2">
              <Button variant="outline" type="button" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                  />
                </svg>
                Continue with Apple
              </Button>
              <Button variant="outline" type="button" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>
            </Field>
          </FieldGroup>
        </form>
        <FieldDescription className="mt-6! px-6 text-center">
          By clicking continue, you agree to our{" "}
          <a target="_blank" rel="noopener noreferrer" href="#">
            Terms of Service
          </a>{" "}
          and{" "}
          <a target="_blank" rel="noopener noreferrer" href="#">
            Privacy Policy
          </a>
          .
        </FieldDescription>
      </Form>

      {isSubmitting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80">
          <div className="flex flex-col items-center gap-4">
            <Loader2Icon className="text-primary size-10 animate-spin" />
            <p className="text-sm font-medium">
              {isSignUp ? "Creating account..." : "Signing you in..."}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
