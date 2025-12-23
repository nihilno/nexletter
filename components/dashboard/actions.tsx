"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pause, Play, Sliders, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function Actions() {
  const isActive = true;
  const { push } = useRouter();

  return (
    <Card className="rounded-t-none border-t-0">
      <CardHeader className="border-b border-dashed text-center text-xl font-bold sm:text-2xl">
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 space-y-6">
        <Button
          className="flex h-12 w-full items-center gap-2"
          variant={"outline"}
          onClick={() => push("/preferences")}
        >
          <Sliders className="size-5" />
          <span>Update Preferences</span>
        </Button>
        <Button className="h-12 w-full items-center gap-2" variant={"outline"}>
          <UserCog className="size-5" />
          <span>Manage Subscription</span>
        </Button>
        <Button
          className="flex h-12 w-full items-center gap-2"
          variant={isActive ? "destructive" : "default"}
        >
          {isActive ? (
            <Pause className="size-5" />
          ) : (
            <Play className="size-5" />
          )}
          <span>{isActive ? "Pause Newsletter" : "Resume Newsletter"}</span>
        </Button>
      </CardContent>
    </Card>
  );
}

export default Actions;
