"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function RenameModal() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your file has been renamed.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
