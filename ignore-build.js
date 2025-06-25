// Only build for main branch deployments
const isProduction = process.env.VERCEL_ENV === 'production';
const isPreview = process.env.VERCEL_ENV === 'preview' && 
                 process.env.VERCEL_GIT_COMMIT_REF === 'main';

if (isProduction || isPreview) {
  console.log('✅ - Building for', isProduction ? 'Production' : 'Preview');
  process.exit(1);
} else {
  console.log('🛑 - Skipping build');
  process.exit(0);
}