'use client';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaKey } from 'react-icons/fa';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Optional

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
        alert('Registered successfully!');
        console.log(data);
        // Redirect to login if needed
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Register error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span>CHRONOS</span>
            </div>
            <div className="py-10 px-10">
              <h2 className="text-xl text-black-400">Create your Account</h2>
              <div className="border-2 border-green-600 w-10 inline-block mb-2"></div>
              <p className="text-gray-400">Enter your details below</p>

              <form onSubmit={handleRegister} className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mt-4">
                  <FaUser />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-100 outline-none text-sm flex-1 px-2"
                    required
                  />
                </div>

                <div className="bg-gray-100 w-64 p-2 flex items-center mt-4">
                  <FaEnvelope />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-100 outline-none text-sm flex-1 px-2"
                    required
                  />
                </div>

                <div className="bg-gray-100 w-64 p-2 flex items-center mt-4">
                  <FaKey />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-100 outline-none text-sm flex-1 px-2"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-8 border-2 border-white bg-green-600 text-white rounded-full px-12 py-2 font-semibold hover:bg-green-700"
                >
                  Register
                </button>
              </form>
            </div>
          </div>

          <div className="w-2/5 text-white bg-green-600 rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <div className="border-2 border-white w-10 inline-block mb-2"></div>
            <p className="mb-10 p-3">Already have an account?</p>
            <Link
              href="/login"
              className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-green-500"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
