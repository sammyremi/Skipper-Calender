const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repoName = "";
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repoName = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
}
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined 
  ? process.env.NEXT_PUBLIC_BASE_PATH 
  : (isGithubActions && repoName ? `/${repoName}` : "/Skipper-Calender");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

