import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle, Grid2X2, Send, Timer } from "lucide-react";
import { Empty } from "./skeletons";

function Preferences({
  preferences,
}: {
  preferences: UserPreferences | undefined;
}) {
  if (!preferences || preferences === undefined) return <Empty />;

  const { is_active, categories, email, frequency, created_at } = preferences;

  return (
    <Card className="rounded-b-none border-b-0">
      <CardHeader className="border-b border-dashed text-center text-xl font-bold sm:text-2xl">
        <CardTitle>Current Preferences</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 space-y-6">
        {categories.length > 0 && (
          <div className="space-y-4 border-b border-dashed pb-4">
            <div className="flex shrink-0 items-center gap-2">
              <Grid2X2 className="size-4.5" />
              <h3 className="font-semibold">Categories</h3>
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-full capitalize">
              {categories.map((category) => (
                <Badge key={category}>{category}</Badge>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex shrink-0 items-center gap-2">
            <Timer className="size-4.5" />
            <h3 className="font-semibold">Frequency</h3>
          </div>
          <p className="text-muted-foreground text-sm capitalize">
            {frequency}
          </p>
        </div>
        <div className="line-clamp-1 flex items-center justify-between gap-1">
          <div className="flex shrink-0 items-center gap-2">
            <Send className="size-4.5" />
            <h3 className="font-semibold">Email</h3>
          </div>
          <p className="text-muted-foreground line-clamp-1 text-sm">{email}</p>
        </div>
        <div className="line-clamp-1 flex items-center justify-between gap-1">
          <div className="flex shrink-0 items-center gap-2">
            <CheckCircle className="size-4.5" />
            <h3 className="font-semibold">Status</h3>
          </div>
          <Badge
            className={cn(
              is_active ? "animate-pulse bg-green-800" : "bg-destructive",
            )}
          >
            {is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="line-clamp-1 flex items-center justify-between gap-1">
          <div className="flex shrink-0 items-center gap-2">
            <Calendar className="size-4.5" />
            <h3 className="font-semibold">Created At</h3>
          </div>
          <p className="text-muted-foreground line-clamp-1 text-sm">
            {new Date(created_at).toLocaleDateString("pl-PL")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Preferences;
