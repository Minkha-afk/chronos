"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Grid, List, MoreVertical, Users, Star, X, ChevronDown, Check } from 'lucide-react';
import ProjectFormModal from '../components/Projectform/form';


const JiraProjectsGrid = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'E-commerce Platform', key: 'ECP', type: 'Software', members: 12, issues: 45, progress: 78, color: 'bg-gradient-to-br from-blue-400 to-blue-600', assignedEmployees: [] },
    { id: 2, name: 'Mobile App Redesign', key: 'MAR', type: 'Design', members: 8, issues: 23, progress: 45, color: 'bg-gradient-to-br from-purple-400 to-purple-600', assignedEmployees: [] },
    { id: 3, name: 'Data Analytics Dashboard', key: 'DAD', type: 'Analytics', members: 6, issues: 17, progress: 92,color: 'bg-gradient-to-br from-green-400 to-green-600', assignedEmployees: [] },
    { id: 4, name: 'Customer Support Portal', key: 'CSP', type: 'Software', members: 10, issues: 31, progress: 65,color: 'bg-gradient-to-br from-orange-400 to-orange-600', assignedEmployees: [] },
    { id: 5, name: 'Marketing Campaign', key: 'MC', type: 'Marketing', members: 5, issues: 12, progress: 34,color: 'bg-gradient-to-br from-pink-400 to-pink-600', assignedEmployees: [] },
    { id: 6, name: 'API Integration', key: 'API', type: 'Backend', members: 4, issues: 19, progress: 87,color: 'bg-gradient-to-br from-teal-400 to-teal-600', assignedEmployees: [] },
    { id: 7, name: 'Security Audit', key: 'SA', type: 'Security', members: 3, issues: 8, progress: 23,color: 'bg-gradient-to-br from-red-400 to-red-600', assignedEmployees: [] },
    { id: 8, name: 'Performance Optimization', key: 'PO', type: 'DevOps', members: 7, issues: 25, progress: 56,color: 'bg-gradient-to-br from-indigo-400 to-indigo-600', assignedEmployees: [] },
    { id: 9, name: 'Performance Optimization', key: 'POO', type: 'DevOps', members: 5, issues: 245, progress: 96, color: 'bg-gradient-to-br from-pink-400 to-black-600', assignedEmployees: [] }
  ]);

  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

 


  const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group h-full">
      <div className={`h-20 ${project.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="absolute top-3 right-3 flex space-x-1">
          
          <button className="p-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-2 left-3">
          <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 text-white text-xs font-semibold tracking-wide">
            {project.key}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between h-36">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors text-base line-clamp-2">
            {project.name}
          </h3>
          <p className="text-sm text-gray-500">{project.type}</p>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{project.members}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span>{project.issues} issues</span>
          </div>
        </div>
      </div>
    </div>
  );

  const displayProjects = filteredProjects.slice(0, 12);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 overflow-hidden flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 text-sm">Manage and track all your projects in one place</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all shadow flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Project</span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-72 shadow-sm"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700">
              <div>Project</div>
              <div>Type</div>
              <div>Progress</div>
              <div>Members</div>
              <div>Issues</div>
              <div>Actions</div>
            </div>
            <div>
              {displayProjects.map((project) => (
                <div key={project.id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${project.color} rounded text-white flex items-center justify-center text-xs font-bold`}>
                      {project.key}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 truncate">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.key}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{project.type}</div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </div>
                  <div className="text-sm text-gray-600">{project.members}</div>
                  <div className="text-sm text-gray-600">{project.issues}</div>
                  <div className="flex items-center space-x-2">
                     
                    <button className="p-1 rounded text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-lg font-semibold">No projects found</div>
            <div className="text-sm text-gray-400">Try changing your search criteria</div>
          </div>
        )}
        {isCreateModalOpen && (
  <ProjectFormModal
    onClose={() => setIsCreateModalOpen(false)}
    onCreate={(newProject) => setProjects([...projects, newProject])}
  />
)}

      </div>
      
    </div>
 
  );
};

export default JiraProjectsGrid;