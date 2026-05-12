import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function createMetadata({ title, description, path = "/", image, noIndex = false, type = "website" }: SeoInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    }
  };
}
