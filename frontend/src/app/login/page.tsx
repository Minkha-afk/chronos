'use client';

import { useState } from 'react';
import { FaFacebook, FaGoogle, FaLinkedin, FaRegEnvelope, FaKey } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

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
      if (res.ok) {
        console.log('Login successful:', data);
        setMessage('Login successful! Redirecting...');
      }
    } catch (err) {
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span>CHRONOS</span>
            </div>
            <div className="py-10 px-10">
              <h2 className="text-1xl text-black-400">Sign in to your Account</h2>
              <div className="border-2 border-green-600 w-10 inline-block mb-2"></div>

              <div className="flex justify-center my-2">
                <a href="#">
                  <FaFacebook />
                </a>
                <a href="#" className="mx-5">
                  <FaGoogle />
                </a>
                <a href="#">
                  <FaLinkedin />
                </a>
              </div>
              <p className="text-gray-400">or use your username account</p>

              <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-2xl">
                <div className="bg-gray-100 w-64 p-2 flex items-center">
                  <FaRegEnvelope className="bg-gray-50" />
                  <input
                    type=""
                    name="username"
                    placeholder="username"
                    value={form.username}
                    onChange={handleChange}
                    className="bg-gray-100 outline-none text-sm flex-1 px-2"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center">
                  <FaKey className="bg-gray-50" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-gray-100 outline-none text-sm flex-1 px-2"
                  />
                </div>

                <div className="flex justify-between w-64 mt-4">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm text-green-600 py-3">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="mt-8 border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-600 hover:text-white"
                >
                  Sign In
                </button>

                {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
              </form>
            </div>
          </div>

          <div className="w-2/5 text-white bg-green-600 rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Welcome to Chronos</h2>
            <div className="border-2 border-white w-10 inline-block mb-2"></div>
            <p className="mb-10 p-3">Anything you want to type</p>
            <Link href="/register" className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-green-500">
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
