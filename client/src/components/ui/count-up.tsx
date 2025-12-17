import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export function CountUp({ to, duration = 2, className, suffix = "" }: CountUpProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, to, { duration: duration });
    return controls.stop;
  }, [to, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      setDisplay(v);
    });
    return unsubscribe;
  }, [rounded]);

  return <span className={className}>{display}{suffix}</span>;
}
