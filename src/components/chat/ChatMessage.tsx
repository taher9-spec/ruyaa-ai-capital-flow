import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Message } from '@/types/chat';

const ChatMessage = ({ message }: { message: Message }) => {
    const isUser = message.role === 'user';

    return (
        <div className={cn('flex items-start gap-3 animate-fade-in', isUser ? 'justify-end' : 'justify-start')}>
            {!isUser && (
                <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-white text-black">
                        <Bot className="w-4 h-4" />
                    </AvatarFallback>
                </Avatar>
            )}
            <div
                className={cn(
                    'max-w-xs md:max-w-md p-3 rounded-xl shadow-md',
                    isUser
                        ? 'bg-card text-white border border-white/10 rounded-br-none'
                        : 'bg-white/10 text-white rounded-bl-none'
                )}
            >
                <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
            {isUser && (
                <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-card border border-white/10">
                        <User className="w-4 h-4 text-white" />
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
};

export default ChatMessage;
