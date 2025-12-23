import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle, Grid2X2, Send, Timer } from "lucide-react";

function Preferences() {
  const isActive = true;

  return (
    <Card className="rounded-b-none border-b-0">
      <CardHeader className="border-b border-dashed text-center text-xl font-bold sm:text-2xl">
        <CardTitle>Current Preferences</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Grid2X2 className="size-4.5" />
            <h3 className="font-semibold">Categories</h3>
          </div>
          <div className="flex items-center gap-3 rounded-full capitalize">
            <Badge>technology</Badge>
            <Badge>sports</Badge>
            <Badge>politics</Badge>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="size-4.5" />
            <h3 className="font-semibold">Frequency</h3>
          </div>
          <p className="text-muted-foreground text-sm">Daily</p>
        </div>
        <div className="line-clamp-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="size-4.5" />
            <h3 className="font-semibold">Email</h3>
          </div>
          <p className="text-muted-foreground line-clamp-1 text-sm">
            maciej.polowy1@gmail.com
          </p>
        </div>
        <div className="line-clamp-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4.5" />
            <h3 className="font-semibold">Status</h3>
          </div>
          <Badge
            className={cn(
              isActive ? "animate-pulse bg-green-800" : "bg-destructive",
            )}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="line-clamp-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="size-4.5" />
            <h3 className="font-semibold">Created At</h3>
          </div>
          <p className="text-muted-foreground line-clamp-1 text-sm">
            17/7/2025
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Preferences;
