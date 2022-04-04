import { motion, Transition } from "framer-motion";

const TransitionWrapper: React.FC<{
  className?: string;
  transition?: Transition;
}> = ({ children, className = "", transition = {} }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0, transition }}
      exit={{ opacity: 0, translateY: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrapper;
