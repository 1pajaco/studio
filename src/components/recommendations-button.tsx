"use client"

import { Wand2 } from "lucide-react";
import { RecommendationsDialog } from "./recommendations-dialog";
import { Button } from "./ui/button";

export function RecommendationsButton() {
  return (
    <RecommendationsDialog>
      <Button variant="outline" className="w-full justify-start">
        <Wand2 className="mr-2 h-4 w-4" />
        Recommended
      </Button>
    </RecommendationsDialog>
  )
}
