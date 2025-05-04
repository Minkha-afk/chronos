'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProfileModal from '../components/ProfileModal';  // Import ProfileModal component

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <nav className="bg-[#0747A6] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-8">
            {/* Nav Links */}
            <div className="hidden md:flex space-x-4">
              {['Projects', 'Issues', 'Boards', 'Reports'].map((item) => (
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
