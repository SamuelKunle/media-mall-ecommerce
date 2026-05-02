import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * Next 15.5 defaults this to true; it wraps segments with SegmentViewNode for DevTools and can
   * trigger RSC client-manifest / webpack chunk errors in dev (missing modules, __webpack_modules__).
   */
  experimental: {
    devtoolSegmentExplorer: false,
  },
  /** Prefer this project when multiple package-lock files exist (e.g. home dir + repo). */
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
