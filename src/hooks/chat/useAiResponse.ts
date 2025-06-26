
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import OpenAI from 'openai';
import { Message } from '@/types/chat';
import { AgentId } from '@/context/ChatContext';
import { fetchAiResponse, getFallbackResponse } from '@/services/aiService';

const openRouterApiKey =
  process.env.OPENROUTER_API_KEY ||
  import.meta.env.VITE_OPENROUTER_API_KEY ||
  import.meta.env.OPENROUTER_API_KEY;

export const useAiResponse = () => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const queryClient = useQueryClient();

  const generateResponse = async (
    threadId: string,
    selectedAgent: AgentId,
    userId: string,
    userMessage: string,
    addMessageMutation: {
      mutate: (msg: Message & { thread_id: string }) => void;
    },
    logUsage: (userId: string, agent: AgentId, role: 'user' | 'assistant', content: string) => void
  ) => {
    if (!openRouterApiKey) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "The OpenRouter API key is not configured. Please set the VITE_OPENROUTER_API_KEY in your project's environment variables."
      };
      addMessageMutation.mutate({ ...errorMessage, thread_id: threadId });
      return;
    }

    setIsAiLoading(true);

    try {
      const currentMessages = await queryClient.fetchQuery<Message[]>({
        queryKey: ['messages', threadId]
      });
      
      let botResponseContent: string;

      if (selectedAgent) {
        botResponseContent = await fetchAiResponse(currentMessages, selectedAgent);
      } else {
        botResponseContent = await getFallbackResponse(userMessage);
      }
      
      await addMessageMutation.mutateAsync({ 
        thread_id: threadId, 
        role: 'assistant', 
        content: botResponseContent 
      });
      
      if (selectedAgent) {
        logUsage(userId, selectedAgent, 'assistant', botResponseContent);
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
      let errorMessageContent = "Sorry, I'm having trouble connecting. Please try again later.";
      
      if (error instanceof OpenAI.APIError) {
        errorMessageContent = `OpenRouter API Error: ${error.status} ${error.type} - ${error.message}`;
      }
      
      addMessageMutation.mutate({ 
        thread_id: threadId, 
        role: 'assistant', 
        content: errorMessageContent 
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  return {
    isAiLoading,
    generateResponse,
  };
};
