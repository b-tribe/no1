import { motion } from "framer-motion";

type Props = {
  team?: string;
  isWinner: boolean;
  onClick: () => void;
};

export default function MatchCard({ team, isWinner, onClick }: Props) {
  return (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-2xl shadow-md border-2 
        ${isWinner ? "border-accent bg-gradient-to-r from-primary to-accent text-white" 
                   : "border-transparent bg-white hover:bg-gray-100"}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-lg font-semibold">
        {team ?? "—"}
      </div>
    </motion.div>
  );
}
