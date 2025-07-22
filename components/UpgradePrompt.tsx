"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";

export default function UpgradePrompt() {
  const user = useUser();
  const [showModal, setShowModal] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    const trialStart = user.user_metadata?.trial_start;
    if (!trialStart) return;

    const startDate = new Date(trialStart);
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    const daysUsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const remaining = 7 - daysUsed;

    setDaysLeft(remaining);
    setShowModal(remaining <= 0);
  }, [user]);

  if (daysLeft === null || !showModal) return null;

  return (
    <Dialog open>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-xl">Trial Expired</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-600 mb-4">
          Your 7-day free trial has ended. Upgrade now to continue enjoying premium features.
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setShowModal(false)}>
            Not now
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Upgrade to Pro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
