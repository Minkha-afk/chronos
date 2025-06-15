'use client';

import { useState } from 'react';
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaRegEnvelope,
  FaKey,
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok && data.role) {
         
        localStorage.setItem('userRole', data.role);

        
        localStorage.setItem('username', data.username);

        setMessage('Login successful! Redirecting...');
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Login failed. Please try again.');
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-screen bg-[#F4F5F7] py-2"
    >
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl overflow-hidden">
          {/* Left: Login Form */}
          <div className="w-full md:w-3/5 p-8 sm:p-10">
            <div className="text-left font-bold text-[#0747A6] text-xl mb-4">CHRONOS</div>
            <h2 className="text-2xl text-gray-800 font-semibold">Sign in to your Account</h2>
            <div className="border-b-2 border-[#0052CC] w-10 mt-2 mb-4"></div>

            {/* Social Login Icons */}
            <div className="flex justify-center space-x-6 text-[#0747A6] text-lg my-2">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaGoogle /></a>
              <a href="#"><FaLinkedin /></a>
            </div>

            <p className="text-gray-500 text-sm mb-4">or use your username account</p>

            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
              <div className="bg-[#F4F5F7] w-full max-w-sm p-2 flex items-center rounded">
                <FaRegEnvelope className="text-[#0747A6] mx-2" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  className="bg-transparent outline-none text-sm w-full"
                  required
                />
              </div>

              <div className="bg-[#F4F5F7] w-full max-w-sm p-2 flex items-center rounded">
                <FaKey className="text-[#0747A6] mx-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="bg-transparent outline-none text-sm w-full"
                  required
                />
              </div>

              <div className="flex justify-between w-full max-w-sm text-sm text-gray-600 mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-[#0052CC] hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-6 bg-[#0052CC] hover:bg-[#0747A6] text-white rounded-full px-12 py-2 font-semibold transition"
              >
                Sign In
              </button>

              {message && (
                <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
              )}
            </form>
          </div>

          {/* Right: Register Prompt */}
          <div className="hidden md:flex flex-col justify-center items-center w-2/5 text-white bg-[#0747A6] rounded-tr-2xl rounded-br-2xl p-10">
            <h2 className="text-3xl font-bold mb-2">Welcome to Chronos</h2>
            <div className="border-b-2 border-white w-10 mb-4"></div>
            <p className="mb-6 text-sm">Don't have an account yet?</p>
            <Link
              href="/register"
              className="border-2 border-white rounded-full px-10 py-2 font-semibold hover:bg-white hover:text-[#0747A6] transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
