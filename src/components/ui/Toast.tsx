import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "error" | "success";
  onClose: () => void;
}

export default function Toast({ message, type = "error", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-close after 3 sec
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-10 right-10 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 ${
            type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          <AlertCircle size={20} />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
