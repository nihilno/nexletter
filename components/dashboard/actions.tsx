"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changeStatus } from "@/lib/actions";
import { Loader2Icon, Pause, Play, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UpdatePreferencesBtn from "./update-preferences-btn";

function Actions({ isActive }: { isActive: boolean | undefined }) {
  const [active, setActive] = useState(isActive);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  async function handleStatus() {
    const newStatus = !active;
    setIsLoading(true);

    try {
      setActive(newStatus);
      const result = await changeStatus(newStatus);
      if (!result.success) {
        setActive(!newStatus);
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "We couldn’t update your newsletter settings. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="rounded-t-none border-t-0">
      <CardHeader className="border-b border-dashed text-center text-xl font-bold sm:text-2xl">
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 space-y-6">
        <UpdatePreferencesBtn disabled={isLoading} />
        <Button
          className="flex h-12 w-full items-center gap-2"
          variant={"outline"}
          disabled={isLoading}
        >
          <UserCog className="size-5" />
          <span>Manage Subscription</span>
        </Button>
        <Button
          className="flex h-12 w-full items-center gap-2"
          variant={active ? "destructive" : "default"}
          onClick={handleStatus}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2Icon className="size-5 animate-spin" />
          ) : active ? (
            <Pause className="size-5" />
          ) : (
            <Play className="size-5" />
          )}
          <span>{active ? "Pause Newsletter" : "Resume Newsletter"}</span>
        </Button>
      </CardContent>
    </Card>
  );
}

export default Actions;
