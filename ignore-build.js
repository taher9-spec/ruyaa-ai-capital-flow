// ignore-build.js
// This script determines whether a build should proceed based on the environment
// Returns exit code 0 to skip the build, exit code 1 to proceed with the build

// Get environment variables
const env = process.env.VERCEL_ENV || '';
const gitRef = process.env.VERCEL_GIT_COMMIT_REF || '';

// Log environment information for debugging
console.log(`VERCEL_ENV: ${env}`);
console.log(`VERCEL_GIT_COMMIT_REF: ${gitRef}`);

// Only build for production (main branch) or preview environments
// Skip all other builds
if (env === 'production' || (env === 'preview' && gitRef === 'main')) {
  console.log('✅ - Build will proceed');
  process.exit(1); // Exit with 1 to proceed with the build
} else {
  console.log('🛑 - Build cancelled');
  process.exit(0); // Exit with 0 to skip the build
}