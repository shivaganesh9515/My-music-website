
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMusicStore } from '../store/musicStore';
import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export const Sidebar: React.FC = () => {
  const { toggleAccountModal } = useMusicStore();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Browse', path: '/browse' },
    { icon: Library, label: 'Library', path: '/library' },
  ];

  return (
    <>
      {/* Mobile header with sidebar trigger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <SidebarTrigger className="text-white" />
        <h1 className="text-xl font-bold text-white">Verse</h1>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      <SidebarBase className="border-r border-white/10">
        <SidebarHeader className="p-6">
          <h1 className="text-2xl font-bold text-white">Verse</h1>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu className="space-y-2 px-4">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 focus-ring w-full ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <button
            onClick={toggleAccountModal}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full focus-ring"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">Premium</p>
            </div>
          </button>
        </SidebarFooter>
      </SidebarBase>
    </>
  );
};
