'use client';

import { useState,useEffect } from 'react';
import Image from 'next/image';
import ProfileModal from './ProfileModal';  

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole,setUserRole] = useState<string | null>(null);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, [])

  return (
    <nav className="bg-[#0747A6] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-8">
            {/* Logo/Brand Name */}
            <div className="ml-[-250px]">
              <h1 className="text-2xl font-extrabold tracking-wide uppercase text-white drop-shadow-md px-30">
                Chronos
              </h1>
            </div>

            {/* Role-based Tabs */}
            <div className="hidden md:flex space-x-4">
              {userRole === 'admin' && (
                <a
                  href="/my-team"
                  className="text-white hover:bg-[#0052CC] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Team
                </a>
              )}
              {userRole === 'employee' && (
                <a
                  href="/your-teams"
                  className="text-white hover:bg-[#0052CC] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Your Teams
                </a>
              )}
            </div>

            {/* Other Nav Links */}
            <div className="hidden md:flex space-x-4">
              {['My Work', 'Issues', 'Boards', 'Reports'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white hover:bg-[#0052CC] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4 relative">
            {/* Search Bar */}
            <div className="relative text-white">
              <input
                type="text"
                placeholder="Search"
                className="bg-[#0052CC] placeholder-white/70 text-white text-sm rounded-md pl-8 pr-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Avatar Placeholder */}
            <div 
              className="w-8 h-8 rounded-full bg-white text-[#0747A6] flex items-center justify-center text-sm font-bold cursor-pointer"
              onClick={toggleModal}
            >
              U
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
