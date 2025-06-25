#!/bin/bash

# This script determines whether a build should proceed based on the environment
# Returns exit code 0 to skip the build, exit code 1 to proceed with the build

# Log environment information for debugging
echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

# Only build for production (main branch) or preview environments
# Skip all other builds
if [[ "$VERCEL_ENV" == "production" || ("$VERCEL_ENV" == "preview" && "$VERCEL_GIT_COMMIT_REF" == "main") ]] ; then
  # Proceed with the build
  echo "✅ - Build will proceed"
  exit 1;
else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi