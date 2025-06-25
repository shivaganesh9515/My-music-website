
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Settings, LogOut } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';

export const AccountModal: React.FC = () => {
  const { isAccountModalOpen, toggleAccountModal } = useMusicStore();

  return (
    <AnimatePresence>
      {isAccountModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={toggleAccountModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card rounded-2xl p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Account</h2>
              <button
                onClick={toggleAccountModal}
                className="text-gray-400 hover:text-white transition-colors focus-ring rounded-lg p-2"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">John Doe</h3>
                  <p className="text-gray-400">Premium Member</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors focus-ring">
                  <User size={20} className="text-gray-400" />
                  <span className="text-white">Edit Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors focus-ring">
                  <Settings size={20} className="text-gray-400" />
                  <span className="text-white">Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-red-400 hover:text-red-300 focus-ring">
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
