import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  avatar?: string;
  isOnline?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  title = "AI Assistant", 
  subtitle = "Online",
  avatar = "AI",
  isOnline = true 
}) => {
  return (
    <div className="p-4 border-b border-white/10 flex items-center gap-3 shrink-0">
      <div className="relative">
        <Avatar>
          <AvatarFallback className="bg-white text-black font-bold">
            {avatar}
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green ring-2 ring-card" />
        )}
      </div>
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-xs text-green">{subtitle}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
