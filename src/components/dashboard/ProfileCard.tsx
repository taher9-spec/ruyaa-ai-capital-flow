import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { type Tables } from "@/integrations/supabase/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EditProfileModal from "./EditProfileModal";

// 3D Tilt effect (copied from CustomAICard)
function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setX((mouseX / width - 0.5) * 20);
    setY((mouseY / height - 0.5) * -20);
  };
  const handleMouseLeave = () => {
    setX(0);
    setY(0);
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transform: `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`,
        transition: 'transform 0.2s cubic-bezier(.36,.07,.19,.97)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

const getInitials = (name: string | null | undefined) =>
  !name
    ? "U"
    : name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("");

const ProfileCard = ({ profile, email }: { profile: Tables<"profiles"> | null | undefined; email: string | undefined }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Tilt className="max-w-lg mx-auto my-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 16 }}
        className="relative bg-[#181A20] rounded-3xl p-10 overflow-hidden shadow-2xl border border-zinc-800"
        tabIndex={0}
        aria-label="Profile information"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-black/80 blur-xl -z-10" aria-hidden />
        <div className="flex flex-col items-center gap-6">
          <Avatar className="h-28 w-28 ring-4 ring-blue-400 shadow-lg">
            <AvatarImage src="/Ruyaa-Agent.png" alt="Ruyaa Agent" />
            <AvatarFallback className="bg-gray-800 text-white font-bold text-3xl">{getInitials(profile?.full_name)}</AvatarFallback>
          </Avatar>
          <div className="text-3xl font-extrabold text-white text-center">{profile?.full_name || "No Name"}</div>
          <div className="text-lg text-zinc-400 text-center">{email}</div>
          <Button
            variant="ghost"
            onClick={() => setModalOpen(true)}
            className="px-8 py-3 rounded-full border border-blue-400 text-blue-200 hover:bg-blue-600/20 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 transition-all font-semibold text-lg mt-4"
            tabIndex={0}
          >
            Edit Profile
          </Button>
        </div>
        <EditProfileModal open={modalOpen} onOpenChange={setModalOpen} profile={profile} email={email} />
      </motion.div>
    </Tilt>
  );
};
export default ProfileCard;
