import { Spinner } from "@/components/ui/spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Spinner className="size-6" />
      <h2 className="font-semibold">Loading</h2>
    </div>
  );
}
