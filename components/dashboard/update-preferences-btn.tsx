"use client";

import { Button } from "@/components/ui/button";
import { Sliders } from "lucide-react";
import { useRouter } from "next/navigation";

function UpdatePreferencesBtn() {
  const { push } = useRouter();

  return (
    <Button
      className="flex h-12 w-full items-center gap-2"
      variant={"outline"}
      onClick={() => push("/preferences")}
    >
      <Sliders className="size-5" />
      <span>Update Preferences</span>
    </Button>
  );
}

export default UpdatePreferencesBtn;
