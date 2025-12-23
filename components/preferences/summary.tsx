"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePreferences } from "@/contexts/preferences-context";
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Loader2Icon,
  Shapes,
} from "lucide-react";

function Summary({ isLoading }: { isLoading: boolean }) {
  const { selectedCategory, selectedFrequency } = usePreferences();
  const hasCategories = selectedCategory.length > 0;

  return (
    <Card>
      <CardHeader className="border-b border-dashed text-center text-xl font-bold sm:text-2xl">
        <CardTitle>Summary</CardTitle>
        <CardDescription className="mt-1.5 font-normal">
          A quick overview of your selected options.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-2 space-y-6">
        <div className="line-clamp-1 grid grid-cols-2 items-baseline">
          <div className="flex items-center gap-2">
            <Shapes className="size-4.5" />
            <h3 className="font-semibold">Categories</h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {hasCategories ? (
              selectedCategory.map((category) => (
                <Badge key={category} className="capitalize">
                  {category}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No categories specified yet.
              </p>
            )}
          </div>
        </div>
        <div className="line-clamp-1 grid grid-cols-2 items-baseline">
          <div className="flex items-center gap-2">
            <Activity className="size-4.5" />
            <h3 className="font-semibold">Frequency</h3>
          </div>
          <Badge className="capitalize">{selectedFrequency} delivery</Badge>
        </div>
      </CardContent>
      <CardFooter className="mt-8">
        <Button
          disabled={!hasCategories || isLoading}
          type="submit"
          className="h-12 w-full items-center gap-2"
        >
          {isLoading ? (
            <Loader2Icon className="size-5 animate-spin" />
          ) : !hasCategories ? (
            <AlertCircle className="size-5" />
          ) : (
            <CheckCircle className="size-5" />
          )}

          <span>
            {isLoading
              ? "Saving Preferences..."
              : !hasCategories
                ? "Specify Categories First"
                : "Save Preferences"}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Summary;
