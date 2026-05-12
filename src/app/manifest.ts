import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MIDIGI Marketing Platform",
    short_name: "MIDIGI",
    description: "Nền tảng website và dashboard marketing của MIDIGI.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#2563EB",
    lang: "vi",
    icons: [
      {
        src: "/brand/favicon.svg",
        sizes: "64x64",
        type: "image/svg+xml"
      },
      {
        src: "/brand/apple-touch-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
