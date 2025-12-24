import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

function Empty() {
  return (
    <Card className="grid h-115 place-items-center">
      <CardContent className="mt-4 flex w-full flex-col items-center gap-4">
        <AlertCircle className="text-primary size-12 animate-pulse" />
        <h2 className="max-w-[30ch] text-center text-base font-semibold">
          Could not load this content right now. Please try again later.
        </h2>
      </CardContent>
    </Card>
  );
}

export default Empty;
