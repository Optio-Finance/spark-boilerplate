import { useEffect, useState } from "react";

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value]);
  return debouncedValue;
}

export function formatNumber(value: any) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(value);
}
