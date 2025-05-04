'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-2 text-[#0747A6]"
    >
      <Link
        href="/profile"
        className="block px-4 py-2 hover:bg-[#E6F0FF] text-sm"
      >
        Profile Settings
      </Link>
      <Link
        href="/account"
        className="block px-4 py-2 hover:bg-[#E6F0FF] text-sm"
      >
        My Account
      </Link>
      <Link
        href="/support"
        className="block px-4 py-2 hover:bg-[#E6F0FF] text-sm"
      >
        Support
      </Link>
      <hr className="my-1" />
      <Link
        href="/login"
        className="block px-4 py-2 hover:bg-[#FFEBE6] hover:text-red-600 text-sm"
      >
        Log Out
      </Link>
    </div>
  );
}
