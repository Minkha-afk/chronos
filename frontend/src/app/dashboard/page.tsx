'use client'
import { useState } from 'react';

import Navbar from '../components/Navbar.tsx';
import Sidebar from '../components/Sidebar.tsx';

const Dashboard = () => {
  return(
    <>
      <Navbar />
      <Sidebar />
      <p>Dashboard</p>
    </>
  );
}

export default Dashboard;
