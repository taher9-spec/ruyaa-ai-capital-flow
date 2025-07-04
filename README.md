# Ruyaa-AI

Ruyaa-AI is an AI-powered trading and assistant engine built with Vite, React and TypeScript.

## Features
- AI-assisted trading chatbot powered by OpenRouter
- Live market data via TwelveData
- Supabase backend for authentication and storage
- Modern dark UI with shadcn and Tailwind CSS

## Getting Started
1. Copy `.env.example` to `.env` and provide your API keys.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```

## Deployment
This project is ready for deployment on [Vercel](https://vercel.com/). Configure the included `vercel.json` and set your environment variables in the Vercel dashboard. Point the domain **ruyaacapital.com** to your Vercel project for production.

### Build Optimization
The project is configured to optimize Vercel builds by limiting deployments to only two environments:

1. **Production builds** - Only triggered for the main branch
2. **Preview builds** - Only triggered for preview deployments of the main branch

This optimization is implemented using Vercel's `ignoreCommand` feature in `vercel.json`, which runs a script to determine whether a build should proceed based on the deployment environment. This prevents unnecessary builds and reduces deployment time and resources.

## Environment Variables
See `.env.example` for the full list of configuration options.

**Important**: the chat UI runs entirely in the browser, so the OpenRouter key must
be exposed via the `VITE_OPENROUTER_API_KEY` variable. Server code can access the
same value through `process.env.OPENROUTER_API_KEY` at build time. If the key is
not provided under the `VITE_` prefix, the agents will respond with a maintenance
message.

`VITE_OPENROUTER_API_KEY` – OpenRouter API key (client side)
`OPENROUTER_API_KEY` – Same key used for server code via `process.env.OPENROUTER_API_KEY`
The agents use free models on OpenRouter (currently `google/gemini-pro`).
Make sure both variables are set in your `.env` file with your own key.
`VITE_TWELVEDATA_API_KEY` – TwelveData API key
`VITE_SUPABASE_URL` – Supabase project URL
`VITE_SUPABASE_ANON_KEY` – Supabase anon key

### Vercel Deployment Checklist

If the chat UI shows a "service maintenance" message or fails to connect to OpenRouter,
ensure that the **`VITE_OPENROUTER_API_KEY`** variable is set in the Vercel project
under **Settings → Environment Variables**. After adding or updating the variable,
trigger a redeploy so the key is embedded into the client bundle.

## Security
See [SECURITY.md](SECURITY.md) for security policies.
