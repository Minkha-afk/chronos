'use client';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Work from '../components/dashboard/Work';
import Chat from '../components/dashboard/Chat' ; 

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Navbar />

      
      <div className="flex flex-1">
         
        <Sidebar />

         
        <div className="flex flex-1">
          
          <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <Work />
          </main>

       
          <aside className="w-90bg-white border-l border-gray-200 p-4">
            <Chat/>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
