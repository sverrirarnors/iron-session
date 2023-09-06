/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
const nextConfig = {
  experimental: {
    serverActions: true, //set to false and remove 'use server' in actions.ts to disable server actions
  },
}

module.exports = nextConfig
