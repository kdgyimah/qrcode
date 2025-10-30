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

    // Check if modal has already been shown in this session
    const modalShown = sessionStorage.getItem("trialModalShown");
    if (modalShown === "true") return;

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
    };

    // Update countdown immediately
    updateCountdown();

    // Show modal after 2 minutes (120000ms)
    const showTimer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("trialModalShown", "true");
    }, 120000);

    // Update countdown every minute
    const interval = setInterval(updateCountdown, 60000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [user]);

  return (
    <Dialog open={open}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-4 sm:p-6">
        <div className="text-center space-y-4 sm:space-y-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Your trial Plan will expire in
          </h2>

          {/* Countdown */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-blue-100 w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center rounded-md"
              >
                <span className="text-lg sm:text-2xl text-blue-600 font-bold">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-blue-600">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600">
            You will lose access to these features after:
          </p>

          {/* Features List */}
          <ul className="text-left text-sm text-gray-700 space-y-2 sm:space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-600 w-4 h-4 shrink-0" />
              Create editable dynamic QR codes
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-600 w-4 h-4 shrink-0" />
              Track scans with analytics
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-600 w-4 h-4 shrink-0" />
              Customize designs without limits
            </li>
            <li className="flex items-center gap-2 flex-wrap">
              <CheckCircle className="text-blue-600 w-4 h-4 shrink-0" />
              SVG, PDF, EPS Download and{" "}
              <a href="/features" className="underline ml-1">
                more
              </a>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                window.location.href = "/pricing";
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
            >
              Upgrade
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}