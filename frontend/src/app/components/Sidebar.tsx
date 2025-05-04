'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaTasks, FaProjectDiagram, FaBug, FaBook } from 'react-icons/fa';

export default function Sidebar() {
  const [active, setActive] = useState('/dashboard');

  const navItems = [
    { label: 'Dashboard', icon: <FaTasks />, href: '/dashboard' },
    { label: 'Projects', icon: <FaProjectDiagram />, href: '/projects' },
    { label: 'Issues', icon: <FaBug />, href: '/issues' },
    { label: 'Docs', icon: <FaBook />, href: '/docs' },
  ];

  return (
    <div className="h-screen w-64 bg-white text-[#0747A6] flex flex-col border-r border-gray-200">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setActive(item.href)}
            className={`flex items-center space-x-3 px-4 py-2 rounded-md transition-all duration-150 text-[#0747A6]
              ${
                active === item.href
                  ? 'bg-[#E6F0FF] font-semibold'
                  : 'hover:bg-[#F4F5F7]'
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">
        © 2025 Chronos
      </div>
    </div>
  );
}
