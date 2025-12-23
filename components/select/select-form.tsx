"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categoriesChecks } from "@/lib/consts";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function SelectForm() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Card className="mt-16">
      <CardHeader className="border-b border-dashed text-center text-xl font-bold sm:text-2xl">
        <CardTitle>Choose your Categories</CardTitle>
        <CardDescription className="mt-1.5 font-normal">
          Select the topics you&apos;d like to see in your personalized
          newsletter.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-2 space-y-6 px-3 lg:px-5">
        {categoriesChecks.map(({ name, description }) => (
          <Label
            key={name}
            className="translate-all hover:bg-background/20 grid cursor-pointer grid-cols-[24px_1fr] gap-x-4 rounded-sm border px-4 py-5 duration-200 ease-in-out hover:-translate-y-2 hover:scale-104"
          >
            <Input type="checkbox" className="w-6" />
            <div>
              <h3 className="text-primary text-base font-semibold">{name}</h3>
              <p className="line-clamp-1 text-sm! font-normal">{description}</p>
            </div>
          </Label>
        ))}
      </CardContent>
    </Card>
  );
}

export default SelectForm;
