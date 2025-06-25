// Paste your new chat UI code here. This file is ready for your custom chat UI component.

'use client';

import React, { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, ArrowDown, Mic, Paperclip, CornerDownLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

// Utility function
function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(' ');
}

// TextShimmer Component
interface TextShimmerProps {
  children: string;
  className?: string;
  duration?: number;
  spread?: number;
}

function TextShimmer({
  children,
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) {
  const dynamicSpread = React.useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  return (
    <motion.div
      className={cn(
        'relative inline-block bg-[length:250%_100%,auto] bg-clip-text',
        'text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]',
        '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
        'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]',
        className
      )}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
    >
      {children}
    </motion.div>
  );
}

// Auto-scroll hook
interface ScrollState {
  isAtBottom: boolean;
  autoScrollEnabled: boolean;
}

interface UseAutoScrollOptions {
  offset?: number;
  smooth?: boolean;
  content?: React.ReactNode;
}

function useAutoScroll(options: UseAutoScrollOptions = {}) {
  const { offset = 20, smooth = false, content } = options;
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastContentHeight = useRef(0);
  const userHasScrolled = useRef(false);

  const [scrollState, setScrollState] = useState<ScrollState>({
    isAtBottom: true,
    autoScrollEnabled: true,
  });

  const checkIsAtBottom = useCallback(
    (element: HTMLElement) => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const distanceToBottom = Math.abs(
        scrollHeight - scrollTop - clientHeight
      );
      return distanceToBottom <= offset;
    },
    [offset]
  );

  const scrollToBottom = useCallback(
    (instant?: boolean) => {
      if (!scrollRef.current) return;

      const targetScrollTop =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

      if (instant) {
        scrollRef.current.scrollTop = targetScrollTop;
      } else {
        scrollRef.current.scrollTo({
          top: targetScrollTop,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }

      setScrollState({
        isAtBottom: true,
        autoScrollEnabled: true,
      });
      userHasScrolled.current = false;
    },
    [smooth]
  );

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const atBottom = checkIsAtBottom(scrollRef.current);

    setScrollState((prev) => ({
      isAtBottom: atBottom,
      autoScrollEnabled: atBottom ? true : prev.autoScrollEnabled,
    }));
  }, [checkIsAtBottom]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => element.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const currentHeight = scrollElement.scrollHeight;
    const hasNewContent = currentHeight !== lastContentHeight.current;

    if (hasNewContent) {
      if (scrollState.autoScrollEnabled) {
        requestAnimationFrame(() => {
          scrollToBottom(lastContentHeight.current === 0);
        });
      }
      lastContentHeight.current = currentHeight;
    }
  }, [content, scrollState.autoScrollEnabled, scrollToBottom]);

  const disableAutoScroll = useCallback(() => {
    const atBottom = scrollRef.current
      ? checkIsAtBottom(scrollRef.current)
      : false;

    if (!atBottom) {
      userHasScrolled.current = true;
      setScrollState((prev) => ({
        ...prev,
        autoScrollEnabled: false,
      }));
    }
  }, [checkIsAtBottom]);

  return {
    scrollRef,
    isAtBottom: scrollState.isAtBottom,
    autoScrollEnabled: scrollState.autoScrollEnabled,
    scrollToBottom: () => scrollToBottom(false),
    disableAutoScroll,
  };
}

// Chat Message List Component
interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  smooth?: boolean;
}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, children, smooth = false, ...props }, _ref) => {
    const {
      scrollRef,
      isAtBottom,
      scrollToBottom,
      disableAutoScroll,
    } = useAutoScroll({
      smooth,
      content: children,
    });

    return (
      <div className="relative w-full h-full">
        <div
          className={cn('flex flex-col w-full h-full p-4 overflow-y-auto', className)}
          ref={scrollRef}
          onWheel={disableAutoScroll}
          onTouchMove={disableAutoScroll}
          {...props}
        >
          <div className="flex flex-col gap-6">{children}</div>
        </div>

        {!isAtBottom && (
          <Button
            onClick={() => {
              scrollToBottom();
            }}
            size="icon"
            variant="outline"
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 inline-flex rounded-full shadow-md"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);

ChatMessageList.displayName = 'ChatMessageList';

// Chat Bubble Components
interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'sent' | 'received';
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant = 'received', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-3 max-w-[85%]',
          variant === 'sent' ? 'ml-auto flex-row-reverse' : 'mr-auto',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChatBubble.displayName = 'ChatBubble';

interface ChatBubbleAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback?: React.ReactNode;
}

const ChatBubbleAvatar = React.forwardRef<HTMLDivElement, ChatBubbleAvatarProps>(
  ({ className, src, fallback, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex h-8 w-8 shrink-0 overflow-hidden rounded-full', className)}
        {...props}
      >
        {src ? (
          <img src={src} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-medium">
            {fallback}
          </div>
        )}
      </div>
    );
  }
);

ChatBubbleAvatar.displayName = 'ChatBubbleAvatar';

interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'sent' | 'received';
  isLoading?: boolean;
}

const ChatBubbleMessage = React.forwardRef<HTMLDivElement, ChatBubbleMessageProps>(
  ({ className, variant = 'received', isLoading, children, ...props }, ref) => {
    if (isLoading) {
      return (
        <div
          ref={ref}
          className={cn(
            'rounded-2xl px-4 py-3 max-w-xs lg:max-w-md',
            'bg-muted text-foreground',
            className
          )}
          {...props}
        >
          <TextShimmer duration={1.5}>Thinking...</TextShimmer>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl px-4 py-3 max-w-xs lg:max-w-md',
          variant === 'sent'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChatBubbleMessage.displayName = 'ChatBubbleMessage';

// Chat Input Component
const ChatInput = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

ChatInput.displayName = 'ChatInput';

// Background Pattern Component
type BGVariantType = 'dots' | 'diagonal-stripes' | 'grid' | 'horizontal-lines' | 'vertical-lines' | 'checkerboard';
type BGMaskType = 'fade-center' | 'fade-edges' | 'fade-top' | 'fade-bottom' | 'fade-left' | 'fade-right' | 'fade-x' | 'fade-y' | 'none';

type BGPatternProps = React.ComponentProps<'div'> & {
  variant?: BGVariantType;
  mask?: BGMaskType;
  size?: number;
  fill?: string;
};

const maskClasses: Record<BGMaskType, string> = {
  'fade-edges': '[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
  'fade-center': '[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]',
  'fade-top': '[mask-image:linear-gradient(to_bottom,transparent,var(--background))]',
  'fade-bottom': '[mask-image:linear-gradient(to_bottom,var(--background),transparent)]',
  'fade-left': '[mask-image:linear-gradient(to_right,transparent,var(--background))]',
  'fade-right': '[mask-image:linear-gradient(to_right,var(--background),transparent)]',
  'fade-x': '[mask-image:linear-gradient(to_right,transparent,var(--background),transparent)]',
  'fade-y': '[mask-image:linear-gradient(to_bottom,transparent,var(--background),transparent)]',
  none: '',
};

function getBgImage(variant: BGVariantType, fill: string, size: number) {
  switch (variant) {
    case 'dots':
      return `radial-gradient(${fill} 1px, transparent 1px)`;
    case 'grid':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case 'diagonal-stripes':
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    case 'horizontal-lines':
      return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case 'vertical-lines':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px)`;
    case 'checkerboard':
      return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
    default:
      return undefined;
  }
}

const BGPattern = ({
  variant = 'grid',
  mask = 'none',
  size = 24,
  fill = 'hsl(var(--border))',
  className,
  style,
  ...props
}: BGPatternProps) => {
  const bgSize = `${size}px ${size}px`;
  const backgroundImage = getBgImage(variant, fill, size);

  return (
    <div
      className={cn('absolute inset-0 z-[-10] size-full', maskClasses[mask], className)}
      style={{
        backgroundImage,
        backgroundSize: bgSize,
        ...style,
      }}
      {...props}
    />
  );
};

// Message Interface
interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp?: Date;
}

// Main AI Chat Component
interface AIChatProps {
  className?: string;
}

const AIChat: React.FC<AIChatProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        content: "I understand your message. This is a simulated AI response. In a real implementation, this would connect to an AI service to generate meaningful responses based on your input.",
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleAttachFile = () => {
    // File attachment functionality would go here
    console.log('Attach file clicked');
  };

  const handleMicrophoneClick = () => {
    // Voice recording functionality would go here
    console.log('Microphone clicked');
  };

  return (
    <div className={cn('flex flex-col h-full bg-background text-foreground', className)}>
      {/* Background Pattern */}
      <BGPattern variant="dots" mask="fade-edges" size={20} fill="hsl(var(--border))" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="flex items-center gap-3">
                    <motion.div 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary"
            animate={{ 
              rotateY: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            whileHover={{ 
              scale: 1.1,
              rotateY: 15,
              transition: { duration: 0.3 }
            }}
          >
            <Bot className="h-6 w-6 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="text-xl font-semibold">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-sm text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="relative flex-1 overflow-hidden">
        <ChatMessageList className="px-2">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
                            <ChatBubble variant={message.sender === 'user' ? 'sent' : 'received'}>
                <motion.div
                  animate={message.sender === 'ai' ? { y: [0, -2, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChatBubbleAvatar
                    className="h-8 w-8 shrink-0"
                    fallback={message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ 
                    scale: 1.02, 
                    y: -1,
                    transition: { duration: 0.2 }
                  }}
                  className="cursor-pointer"
                >
                  <ChatBubbleMessage variant={message.sender === 'user' ? 'sent' : 'received'}>
                    {message.content}
                  </ChatBubbleMessage>
                </motion.div>
              </ChatBubble>
            </motion.div>
          ))}

          {isLoading && (
                        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatBubble variant="received">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChatBubbleAvatar
                    className="h-8 w-8 shrink-0"
                    fallback={<Bot className="h-4 w-4" />}
                  />
                </motion.div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.01, 1],
                    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <ChatBubbleMessage isLoading />
                </motion.div>
              </ChatBubble>
            </motion.div>
          )}
        </ChatMessageList>
      </div>

      {/* Input Area */}
      <div className="relative z-10 p-4 border-t border-border/50 backdrop-blur-sm bg-background/80">
        {/* Removed animated border flash */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-border bg-background/50 backdrop-blur-sm focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[60px] resize-none rounded-xl bg-transparent border-0 p-4 shadow-none focus-visible:ring-0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
              }
            }}
          />
          <div className="flex items-center justify-between p-3 pt-0">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleAttachFile}
                className="h-8 w-8 rounded-full hover:bg-accent"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleMicrophoneClick}
                className="h-8 w-8 rounded-full hover:bg-accent"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>

                        <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                size="sm"
                className="ml-auto gap-1.5 rounded-full transition-shadow hover:shadow-lg"
                disabled={!input.trim() || isLoading}
              >
                Send Message
                <CornerDownLeft className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Demo Component
function AIChatDemo() {
  return (
    <div className="h-screen w-full bg-background dark">
      <AIChat />
    </div>
  );
}

export default AIChatDemo;
