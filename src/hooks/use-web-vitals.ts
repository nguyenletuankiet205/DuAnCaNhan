"use client";

import { useReportWebVitals } from "next/web-vitals";

function readCookie(name: string) {
  return document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`))
    ?.split("=")
    .slice(1)
    .join("=");
}

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: metric.rating,
      navigationType: metric.navigationType
    });

    fetch("/api/vitals", {
      body,
      method: "POST",
      keepalive: true,
      headers: {
        "content-type": "application/json",
        "x-csrf-token": readCookie("midigi_csrf") ?? ""
      }
    }).catch(() => undefined);
  });

  return null;
}
