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

## Environment Variables
See `.env.example` for the full list of configuration options.

**Important**: the chat UI runs entirely in the browser, so the OpenRouter key must
be exposed via the `VITE_OPENROUTER_API_KEY` variable. The plain `OPENROUTER_API_KEY`
name is only useful for server-side code. If the key is not provided under the `VITE_`
prefix, the agents will respond with a maintenance message.

`VITE_OPENROUTER_API_KEY` – OpenRouter API key (client side, e.g. `sk-or-...`)
`OPENROUTER_API_KEY` – Optional fallback key name
The agents default to the free `google/gemini-pro` model via OpenRouter
`VITE_TWELVEDATA_API_KEY` – TwelveData API key
`VITE_SUPABASE_URL` – Supabase project URL
`VITE_SUPABASE_ANON_KEY` – Supabase anon key

## Security
See [SECURITY.md](SECURITY.md) for security policies.
