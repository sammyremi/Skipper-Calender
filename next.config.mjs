const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repoName = "";
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repoName = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
}
const isUserRepo = repoName.toLowerCase().endsWith(".github.io");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubActions && !isUserRepo && repoName ? `/${repoName}` : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export & GitHub Pages media loading
  },
};

export default nextConfig;
