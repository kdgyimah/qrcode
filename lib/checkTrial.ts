import dayjs from "dayjs";

export const isTrialExpired = (user: any): boolean => {
  const start = user?.user_metadata?.trial_started_at;
  if (!start) return true;
  return dayjs().isAfter(dayjs(start).add(7, "days"));
};

export const getTrialRemaining = (user: any) => {
  const start = user?.user_metadata?.trial_started_at;
  if (!start) return null;

  const expires = dayjs(start).add(7, "days");
  const now = dayjs();

  const diff = expires.diff(now, "second");
  return {
    days: Math.floor(diff / (60 * 60 * 24)),
    hours: Math.floor((diff % (60 * 60 * 24)) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60,
  };
};
