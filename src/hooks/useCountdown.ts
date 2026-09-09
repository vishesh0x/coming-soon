import { useEffect, useState } from "react";

export type CountdownStatus = "running" | "live" | "invalid";

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  status: CountdownStatus;
}

export function useCountdown(targetDate: string): CountdownResult {
  const target = Date.parse(targetDate);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const currentTime = Date.now();
    setNow(currentTime);

    if (!Number.isFinite(target) || target <= currentTime) return;

    const tick = (): void => {
      const next = Date.now();
      setNow(next);

      if (next >= target) {
        window.clearInterval(interval);
      }
    };

    const interval = window.setInterval(tick, 1000);

    const onVisibilityChange = (): void => {
      if (document.visibilityState === "visible") tick();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [target]);

  if (!Number.isFinite(target)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      status: "invalid",
    };
  }

  const totalSeconds = Math.max(0, Math.ceil((target - now) / 1000));

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalSeconds,
    status: totalSeconds === 0 ? "live" : "running",
  };
}