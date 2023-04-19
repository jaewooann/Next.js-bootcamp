/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  generateBuildId: () => "codecamp_deploy_09",

  // getServerSideProps 들어있는 페이지는 제외하고 빌드시켜줘!
  exportPathMap: () => ({
    "/": { page: "/" },
    "/boards": { page: "/boards" },
    "/404": { page: "/404" },
  })
};

module.exports = nextConfig
