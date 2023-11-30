"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_CHARACTERS, MAX_FREE_COUNTS, MAX_PRO_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Settings, Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { FcSettings } from "react-icons/fc";

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
  characterCount: number;
}

const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
  characterCount = 0,
}: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
console.log(isPro)
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            {/* {isPro ? (
              <p className="text-white">
                {apiLimitCount} / {MAX_PRO_COUNTS} Voice Creations
              </p>
            ) : (
              <p className="text-white">
                {apiLimitCount} / {MAX_FREE_COUNTS} Voice Creations
              </p>
            )} */}
            {isPro ? (
              <p className="text-white">
                {characterCount} / {MAX_CHARACTERS} Characters
              </p>
            ) : (
              <p className="text-white">
                {apiLimitCount} / {MAX_FREE_COUNTS} Voice Creations
              </p>
            )}

            {isPro ? (
              <Progress
                className="h-3"
                value={(characterCount / MAX_CHARACTERS) * 100}
              />
            ) : (
              <Progress
                className="h-3"
                value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
              />
            )}
          </div>
          {isPro ? (
            <Link href="/settings">
            <Button
              variant="orange"
              className="w-full"
            >
              Settings
              <FcSettings className="w-4 h-4 ml-2" />
            </Button>
            </Link>
          ) : (
            <Button
              onClick={proModal.onOpen}
              variant="outline"
              className="w-full"
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-yellow-500" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;