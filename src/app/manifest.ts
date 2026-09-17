import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AutoCare",
    short_name: "AutoCare",
    description:
      "Trusted auto repair, diagnostics, maintenance, and car care appointment booking.",
    start_url: "/",
    display: "standalone",
    background_color: "#202020",
    theme_color: "#ec3042",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
