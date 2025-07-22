"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { CheckCircle } from "lucide-react";

dayjs.extend(duration);

export default function TrialModal() {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const trialDays = 7;

  useEffect(() => {
    if (!user) return;

    const trialStart = dayjs(user.user_metadata?.trial_started_at);
    const trialEnd = trialStart.add(trialDays, "day");

    const updateCountdown = () => {
      const now = dayjs();
      const diff = dayjs.duration(trialEnd.diff(now));
      setTimeLeft({
        days: diff.days(),
        hours: diff.hours(),
        minutes: diff.minutes(),
      });

      setOpen(true);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <Dialog open={open}>
      <DialogContent className="w-[449px] h-[574px] rounded-xl shadow-lg">
        <div className="text-center space-y-6 px-4 pt-6">
          <h2 className="text-xl font-semibold text-gray-800">Your trial Plan will expire in</h2>

          <div className="flex justify-center gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-blue-100 w-[93px] h-[93px] flex flex-col items-center justify-center rounded-md"
              >
                <span className="text-3xl text-blue-600 font-bold">{item.value}</span>
                <span className="text-sm font-medium text-blue-600">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600">You will lose access to these features after:</p>

          <ul className="text-left text-sm text-gray-700 space-y-3 px-6">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-600 w-4 h-4" />
              Create editable dynamic QR codes
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-600 w-4 h-4" />
              Track scans with analytics
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-600 w-4 h-4" />
              Customize designs without limits
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-600 w-4 h-4" />
              SVG, PDF, EPS Download and <a href="/features" className="underline">more</a>
            </li>
          </ul>

          <div className="flex justify-end gap-4 px-4 mt-6">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                window.location.href = "/pricing";
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Upgrade
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
