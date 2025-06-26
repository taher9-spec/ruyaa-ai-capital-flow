
import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { useGuestChat } from '@/hooks/chat/useGuestChat';
import { useChatContext } from '@/context/ChatContext';
import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import LoadingBubble from './LoadingBubble';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Auth } from '../Auth';
import { Toaster } from '../ui/toaster';
import HumanHelpModal from './HumanHelpModal';

const ChatPane = () => {
    const {
        messages,
        input,
        isLoading,
        setInput,
        handleInputChange,
        handleSubmit,
        handleVoiceRecording,
        handleFileUpload,
        isRecording,
        isUploading,
        authRequired,
        clearAuthRequired,
        session
    } = useChat();
    const { selectedAgent } = useChatContext();
    const guestChat = useGuestChat(selectedAgent);
    const [humanOpen, setHumanOpen] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inGuestMode = !session;

    const scrollMessages = inGuestMode ? guestChat.messages : messages;
    const loadingState = inGuestMode ? guestChat.isLoading : isLoading;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [scrollMessages, loadingState]);

    if (authRequired) {
        return (
            <div className="w-full h-full bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <Auth onSuccess={clearAuthRequired} />
                <Toaster />
            </div>
        );
    }
    const displayMessages = inGuestMode ? guestChat.messages : messages;
    const currentInput = inGuestMode ? guestChat.input : input;
    const handleChange = inGuestMode ? guestChat.handleInputChange : handleInputChange;
    const setInputHandler = inGuestMode ? guestChat.setInput : setInput;
    const handleSubmitForm = inGuestMode ? guestChat.handleSubmit : handleSubmit;
    const sending = inGuestMode ? guestChat.isLoading : isLoading;
    const recording = inGuestMode ? false : isRecording;
    const uploading = inGuestMode ? false : isUploading;

    const quickActions = [
        { label: 'How to start?', value: 'How do I start trading?' },
        { label: 'Show signals', value: 'Show signals' },
        { label: 'Withdraw help', value: 'How do I withdraw?' },
        { label: 'Talk to Human \uD83D\uDC64', value: null },
    ];

    return (
        <div className="w-full h-full bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <ChatHeader />

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {displayMessages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                {sending && <LoadingBubble />}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t border-white/10 bg-card/50 flex items-center gap-2 overflow-x-auto p-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    if (action.value) {
                      setInputHandler(action.value);
                    } else {
                      setHumanOpen(true);
                    }
                  }}
                  className="text-sm px-3 py-1 rounded-full border border-white/20 hover:bg-white/10 whitespace-nowrap"
                >
                  {action.label}
                </button>
              ))}
            </div>

            <ChatInput
                input={currentInput}
                onInputChange={handleChange}
                onSubmit={handleSubmitForm}
                onVoiceRecording={handleVoiceRecording}
                onFileUpload={handleFileUpload}
                isLoading={sending}
                isRecording={recording}
                isUploading={uploading}
            />

            <HumanHelpModal open={humanOpen} onOpenChange={setHumanOpen} />

            <Toaster />
        </div>
    );
};

export default ChatPane;
