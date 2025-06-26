import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface HumanHelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HumanHelpModal: React.FC<HumanHelpModalProps> = ({ open, onOpenChange }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const openrouterApiKey =
    process.env.OPENROUTER_API_KEY ||
    import.meta.env.VITE_OPENROUTER_API_KEY ||
    import.meta.env.OPENROUTER_API_KEY;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setEmail(data.user.email ?? '');
        const nameMeta = data.user.user_metadata.full_name as string | undefined;
        if (nameMeta) setName(nameMeta);
      }
    });
  }, []);

  const enhanceMessage = async () => {
    if (!openrouterApiKey || !message) return;
    try {
      setLoading(true);
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openrouterApiKey}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Please improve this support request:\n${message}`,
            },
          ],
        }),
      });
      const json = await res.json();
      const improved = json.choices?.[0]?.message?.content;
      if (improved) setMessage(improved.trim());
    } catch (err) {
      console.error('Enhance message error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support request', { name, email, phone, message });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Talk to Human</DialogTitle>
          <DialogDescription className="text-gray-400">
            Send a message to our support team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Textarea
            placeholder="How can we help?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex items-center justify-between">
            <Button type="button" variant="secondary" onClick={enhanceMessage} disabled={loading}>
              Enhance my message
            </Button>
            <Button type="submit" disabled={loading}>Send</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HumanHelpModal;

