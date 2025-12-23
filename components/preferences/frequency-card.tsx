"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePreferences } from "@/contexts/preferences-context";
import { frequencyOptions } from "@/lib/consts";

function FrequencyCard() {
  const { selectedFrequency, setSelectedFrequency } = usePreferences();

  return (
    <Card className="mt-16 md:mt-0 md:h-full">
      <CardHeader className="border-b border-dashed text-center text-xl font-bold sm:text-2xl">
        <CardTitle>Daily Frequency</CardTitle>
        <CardDescription className="mt-1.5 font-normal">
          How often would you like to receive the newsletter?
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-2 space-y-6 md:flex md:h-full md:flex-col md:justify-center">
        {frequencyOptions.map(({ id, name, description }) => (
          <div key={id}>
            <Input
              type="radio"
              name="frequency"
              id={id}
              checked={selectedFrequency === id}
              className="peer hidden"
              onChange={() => setSelectedFrequency(id)}
            />

            <Label
              htmlFor={id}
              className="peer-checked:border-primary peer-checked:bg-background/20 hover:border-primary/50 hover:bg-background/20 block cursor-pointer rounded-sm border px-4 py-5 duration-200 hover:-translate-y-1 peer-checked:[&>div>div>div]:opacity-100"
            >
              <div className="grid grid-cols-[24px_1fr] gap-x-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-sm border">
                  <div className="bg-primary h-3 w-3 rounded-full opacity-0 transition" />
                </div>

                <div>
                  <h3 className="text-primary text-base font-semibold">
                    {name}
                  </h3>
                  <p className="line-clamp-1 text-sm font-normal">
                    {description}
                  </p>
                </div>
              </div>
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default FrequencyCard;
