'use client';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaKey } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {motion} from 'framer-motion';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Register error:', err);
      alert('Something went wrong.');
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
           
          <div className="w-full md:w-3/5 p-8 sm:p-10">
            <div className="text-left font-bold text-[#0747A6] text-xl mb-4">CHRONOS</div>
            <h2 className="text-2xl text-gray-800 font-semibold">Create your Account</h2>
            <div className="border-b-2 border-[#0052CC] w-10 mt-2 mb-4"></div>
            <p className="text-gray-500 text-sm mb-6">Enter your details below</p>

            <form onSubmit={handleRegister} className="flex flex-col items-center space-y-4">
 
  <div className="bg-[#F4F5F7] w-full max-w-sm p-2 flex items-center rounded">
    <FaUser className="text-[#0747A6] mx-2" />
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="bg-transparent outline-none text-sm w-full"
      required
    />
  </div>

  
  <div className="bg-[#F4F5F7] w-full max-w-sm p-2 flex items-center rounded">
    <FaEnvelope className="text-[#0747A6] mx-2" />
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="bg-transparent outline-none text-sm w-full"
      required
    />
  </div>
 
  <div className="bg-[#F4F5F7] w-full max-w-sm p-2 flex items-center rounded">
    <FaKey className="text-[#0747A6] mx-2" />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="bg-transparent outline-none text-sm w-full"
      required
    />
  </div>

  
  <div className="bg-[#F4F5F7] w-full max-w-sm p-2 flex items-center rounded">
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="bg-transparent outline-none text-sm w-full text-gray-700"
      required
    >
      <option value="user" disabled>Select Role</option>
      <option value="admin">Admin</option>
      <option value="employee">Employee</option>
    </select>
  </div>

  <button
    type="submit"
    className="mt-6 bg-[#0052CC] hover:bg-[#0747A6] text-white rounded-full px-12 py-2 font-semibold transition"
  >
    Register
  </button>
</form>

          </div>

       
          <div className="hidden md:flex flex-col justify-center items-center w-2/5 text-white bg-[#0747A6] rounded-tr-2xl rounded-br-2xl p-10">
            <h2 className="text-3xl font-bold mb-2">Already Registered?</h2>
            <div className="border-b-2 border-white w-10 mb-4"></div>
            <p className="mb-6 text-center text-sm">Sign in to access your workspace.</p>
            <Link
              href="/login"
              className="border-2 border-white rounded-full px-10 py-2 font-semibold hover:bg-white hover:text-[#0747A6] transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
