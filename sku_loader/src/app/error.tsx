
// For error handling, create an error page:
// app/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Logo className="w-24 h-24 mb-8" animate={false} />
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#FF1493]">
          Something went wrong!
        </h2>
        <p className="text-gray-600">
          {error.message || "An error occurred while processing your request."}
        </p>
        <Button
          onClick={reset}
          className="bg-[#FF1493] hover:bg-[#FF1493]/90 text-white"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}