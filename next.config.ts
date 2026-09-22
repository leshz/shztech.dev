import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fail the production build on type or lint errors rather than shipping them.
  typescript: { ignoreBuildErrors: false },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Long-lived immutable caching for hashed build assets; HTML stays revalidated.
  poweredByHeader: false,
};

// Wraps the config so content-collections builds (and watches, in dev) alongside Next.
export default withContentCollections(nextConfig);
