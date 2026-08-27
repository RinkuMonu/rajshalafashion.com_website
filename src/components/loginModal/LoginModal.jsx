import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginModal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // close when clicking outside
          />

          {/* Modal Content */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="bg-white rounded-3xl outline-none shadow-xl w-full max-w-4xl max-h-[90vh]  relative overflow-y-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-7 right-2 sm:top-5 z-50 sm:right-5 text-gray-500 hover:text-black text-lg sm:text-xl bg-gray-100 hover:bg-gray-200 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center transition-all duration-200"
                aria-label="Close"
              >
                ×
              </button>

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
