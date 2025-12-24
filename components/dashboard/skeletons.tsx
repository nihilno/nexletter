import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2Icon } from "lucide-react";

export function Empty() {
  return (
    <Card className="mt-16 grid h-115 place-items-center">
      <CardContent className="mt-4 flex w-full flex-col items-center gap-4">
        <AlertCircle className="text-primary size-12 animate-pulse" />
        <h2 className="max-w-[30ch] text-center text-base font-semibold">
          Could not load this content right now. Please try again later.
        </h2>
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
