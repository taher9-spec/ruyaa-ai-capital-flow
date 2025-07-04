import OpenAI from "openai";
import { Message } from "@/types/chat";
import { AgentId } from "@/context/ChatContext";
import { modelMap, systemPrompts } from "@/config/agentConfig";


const getOpenrouter = () => {
  const apiKey =
    process.env.OPENROUTER_API_KEY ||
    import.meta.env.VITE_OPENROUTER_API_KEY ||
    import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('OpenRouter API key missing! Check .env file and deployment settings');
    throw new Error('API_KEY_MISSING');
  }

  const referer =
    import.meta.env.VITE_PUBLIC_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
      "HTTP-Referer": referer,
      "X-Title": "Ruyaa AI",
    },
  });
};

export const fetchAiResponse = async (
  newMessages: Message[],
  selectedAgent: AgentId,
): Promise<string> => {
  try {
    // Get model and system prompt for this agent
    const model = modelMap[selectedAgent] || modelMap.general;
    const instructions = systemPrompts[selectedAgent] || systemPrompts.general;

    // 3. Build message payload with system instructions
    const messages = [
      {
        role: "system",
        content: instructions,
      },
      ...newMessages,
    ];

    const openrouter = getOpenrouter();
    if (!openrouter) {
      return "API Connection Error: Unable to establish connection. Please check network connection and try again.";
    }

    console.log(`Making AI request for agent: ${selectedAgent || "general"}`);
    console.log(
      `Using model: ${model}`,
    );

    const completion = await openrouter.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const botResponse = completion.choices[0].message;

    if (!botResponse || !botResponse.content) {
      console.warn("Received empty response from AI");
      return "I'm having service maintenance - please wait while I prepare myself and come back soon. 🛠️";
    }

    if (botResponse.function_call) {
      console.log("Function call requested:", botResponse.function_call);
      return `I need to perform an action: ${botResponse.function_call.name}. Function calling is not fully implemented yet.`;
    }

    console.log("AI response generated successfully");
    return botResponse.content;
  } catch (error) {
    console.error("Error in fetchAiResponse:", error);

    // Handle network errors explicitly so users know when access to
    // openrouter.ai is blocked. `fetch` throws a TypeError in that case.
    if (error instanceof TypeError) {
      return "Network request to OpenRouter failed. Ensure access to openrouter.ai is allowed.";
    }

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return "I'm having service maintenance - please wait while I prepare myself and come back soon. 🛠️";
      } else if (error.status === 429) {
        return "I'm experiencing high demand right now. Please try again in a moment.";
      } else if (error.status === 500) {
        return "I'm having service maintenance - please wait while I prepare myself and come back soon. 🛠️";
      }
      return "I'm having service maintenance - please wait while I prepare myself and come back soon. 🛠️";
    }

    return "I'm having service maintenance - please wait while I prepare myself and come back soon. 🛠️";
  }
};

export const checkApiHealth = async (): Promise<{status: string, error?: string}> => {
  try {
    const testResponse = await fetch('https://openrouter.ai/api/v1/auth/key', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return {
      status: testResponse.ok ? 'active' : 'inactive',
      error: testResponse.statusText
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export const getFallbackResponse = async (message: string): Promise<string> => {
  console.log("Using fallback response for message:", message);
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return maintenance message instead of API key configuration message
  return "I'm having service maintenance - please wait while I prepare myself and come back soon. 🛠️";
};
