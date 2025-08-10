import React from "react";

type Props = {
  className?: string;
};

export default function Skeleton({ className = "" }: Props) {
  return (
    <div
      className={
        "animate-pulse rounded bg-slate-200 dark:bg-slate-700 " + className
      }
    />
  );
}
