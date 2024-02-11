"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_CHARACTERS, MAX_PRO_CHARACTERS} from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { FcSettings } from "react-icons/fc";

interface FreeCounterProps {
  freeCharacterCount: number;
  isPro: boolean;
  proCharacterCount: number;
}

const CharacterCounter = ({
  freeCharacterCount = 0,
  isPro = false,
  proCharacterCount = 0,
}: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
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
                {proCharacterCount} / {MAX_PRO_CHARACTERS} Characters
              </p>
            ) : (
              <p className="text-white text-xs">
                {freeCharacterCount} / {MAX_FREE_CHARACTERS} Free Characters Left
              </p>
            )}

            {isPro ? (
              <Progress
                className="h-3"
                value={(proCharacterCount / MAX_PRO_CHARACTERS) * 100}
              />
            ) : (
              <Progress
                className="h-3"
                value={(freeCharacterCount / MAX_FREE_CHARACTERS) * 100}
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

export default CharacterCounter;