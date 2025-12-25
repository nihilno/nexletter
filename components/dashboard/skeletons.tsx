"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Loader2Icon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function Empty() {
  const { refresh } = useRouter();

  return (
    <Card className="mx-auto mt-16 grid h-115 max-w-5xl place-items-center">
      <CardContent className="mt-6 flex w-full flex-col items-center gap-6">
        <AlertCircle className="text-primary size-14 animate-pulse" />

        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="max-w-[32ch] text-xl font-semibold md:text-3xl">
            Something went wrong while loading this content.
          </h2>
          <p className="text-muted-foreground max-w-[45ch] text-sm md:text-base">
            This might be a temporary issue with your connection or our servers.
            Give it a moment and try again. If the problem persists, you can
            refresh the page.
          </p>
        </div>

        <Button
          variant="default"
          onClick={() => refresh()}
          size="lg"
          className="px-8 py-6 text-base md:text-lg"
        >
          Refresh
        </Button>
      </CardContent>
    </Card>
  );
}

export function Loader() {
  return (
    <section className="grid h-150 place-items-center">
      <Loader2Icon className="text-primary size-12 animate-spin" />
    </section>
  );
}

export function SetUp() {
  return (
    <Card className="mx-auto mt-16 grid h-115 max-w-5xl place-items-center">
      <CardContent className="mt-6 flex w-full flex-col items-center gap-6">
        <Sparkles className="text-primary size-14" />

        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="max-w-[32ch] text-xl font-semibold md:text-3xl">
            Let’s set up your newsletter.
          </h2>
          <p className="text-muted-foreground max-w-[45ch] text-sm md:text-base">
            Choose the topics you care about and how often you want to receive
            your AI‑crafted updates. It only takes a moment, and you’ll start
            getting personalized summaries right to your inbox.
          </p>
        </div>
      </CardContent>

      <CardFooter className="mt-7 flex items-center justify-center pb-8">
        <Link href="/preferences">
          <Button size="lg" className="px-8 py-6 text-base md:text-lg">
            Get started
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
