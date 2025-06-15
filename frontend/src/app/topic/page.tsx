"use client"
import React, { useState } from 'react';
import { ArrowLeft, Search, MoreHorizontal, User, Calendar, Clock, ChevronDown, Filter, Plus } from 'lucide-react';

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [allTopics, setAllTopics] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Features',
    priority: 'Medium',
    assignee: 'John Doe'
  });

  // Sample project data
  const project = {
    name: 'Ecommerce Website',
    key: 'ECM',
    description: 'Complete online shopping platform with modern features'
  };

  // Initialize topics data
  React.useEffect(() => {
    if (allTopics.length === 0) {
      setAllTopics(initialTopics);
    }
  }, []);

  // Sample topics data - structured like Jira issues
  const initialTopics = [
    {
      id: 'ECM-1',
      title: 'Login Page',
      description: 'Implement user authentication and login functionality with form validation',
      status: 'Done',
      priority: 'Medium',
      assignee: 'John Doe',
      category: 'Authentication',
      created: '2024-01-15',
      updated: '2024-01-20'
    },
    {
      id: 'ECM-2',
      title: 'Dashboard',
      description: 'Create admin dashboard with analytics and overview widgets',
      status: 'Done',
      priority: 'High',
      assignee: 'Jane Smith',
      category: 'UI/UX',
      created: '2024-01-16',
      updated: '2024-01-22'
    },
    {
      id: 'ECM-3',
      title: 'Product Catalog',
      description: 'Build product browsing interface with search and filter capabilities',
      status: 'Done',
      priority: 'High',
      assignee: 'Mike Johnson',
      category: 'Features',
      created: '2024-01-17',
      updated: '2024-01-25'
    },
    {
      id: 'ECM-4',
      title: 'Shopping Cart',
      description: 'Develop shopping cart functionality with add/remove items',
      status: 'Done',
      priority: 'High',
      assignee: 'Sarah Wilson',
      category: 'Features',
      created: '2024-01-18',
      updated: '2024-01-26'
    },
    {
      id: 'ECM-5',
      title: 'Checkout Process',
      description: 'Complete payment processing and order completion flow',
      status: 'Done',
      priority: 'Critical',
      assignee: 'David Brown',
      category: 'Payment',
      created: '2024-01-19',
      updated: '2024-01-28'
    },
    {
      id: 'ECM-6',
      title: 'User Profile',
      description: 'Build user account management and profile settings page',
      status: 'Done',
      priority: 'Medium',
      assignee: 'Lisa Garcia',
      category: 'Authentication',
      created: '2024-01-20',
      updated: '2024-01-30'
    },
    {
      id: 'ECM-7',
      title: 'Order History',
      description: 'Display user order history with tracking and status updates',
      status: 'Done',
      priority: 'Medium',
      assignee: 'Tom Anderson',
      category: 'Features',
      updated: '2024-02-01'
    },
    {
      id: 'ECM-8',
      title: 'Product Reviews',
      description: 'Implement product rating and review system',
      status: 'Done',
      priority: 'Low',
      assignee: 'Emma Davis',
      category: 'Features',
      created: '2024-01-22',
      updated: '2024-02-03'
    },
    {
      id: 'ECM-9',
      title: 'Admin Panel',
      description: 'Create comprehensive admin interface for product and user management',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Alex Martinez',
      category: 'Admin',
      created: '2024-01-23',
      updated: '2024-02-05'
    },
    {
      id: 'ECM-10',
      title: 'Inventory Management',
      description: 'Build inventory tracking and management system',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'Chris Taylor',
      category: 'Admin',
      created: '2024-01-24',
      updated: '2024-02-01'
    },
    {
      id: 'ECM-11',
      title: 'Email Notifications',
      description: 'Setup automated email notifications for orders and updates',
      status: 'To Do',
      priority: 'Low',
      assignee: 'Rachel White',
      category: 'Features',
      created: '2024-01-25',
      updated: '2024-02-01'
    },
    {
      id: 'ECM-12',
      title: 'Analytics Dashboard',
      description: 'Create comprehensive analytics and reporting dashboard',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'Kevin Lee',
      category: 'Analytics',
      created: '2024-01-26',
      updated: '2024-02-01'
    }
  ];

  const topics = allTopics.length > 0 ? allTopics : initialTopics;

  const categories = ['All', ...new Set(topics.map(topic => topic.category))];
  const statuses = ['All', 'To Do', 'In Progress', 'Done'];

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || topic.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateTopic = (e) => {
    e.preventDefault();
    
    // Generate new topic ID
    const newId = `ECM-${topics.length + 1}`;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newTopic = {
      id: newId,
      title: formData.title,
      description: formData.description,
      status: 'To Do',
      priority: formData.priority,
      assignee: formData.assignee,
      category: formData.category,
      created: currentDate,
      updated: currentDate
    };
    
    setAllTopics([...topics, newTopic]);
    setIsCreateModalOpen(false);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'Features',
      priority: 'Medium',
      assignee: 'John Doe'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Done': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-3 mb-2">
            <button className="flex items-center text-gray-600 hover:text-gray-900 text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Projects
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-sm font-medium text-gray-900">{project.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{project.name}</h1>
              <p className="text-gray-600 text-sm mt-1">{project.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <button className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm">
              <Filter className="h-4 w-4 mr-1" />
              More
            </button>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-5">Topic</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Assignee</div>
              <div className="col-span-1">Priority</div>
              <div className="col-span-2">Updated</div>
            </div>
          </div>

          {/* Topics */}
          <div className="divide-y divide-gray-200">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Topic Info */}
                  <div className="col-span-5">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-medium">T</span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500 text-sm font-mono">{topic.id}</span>
                          <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600">
                            {topic.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {topic.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {topic.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(topic.status)}`}>
                      {topic.status}
                    </span>
                  </div>

                  {/* Assignee */}
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {getInitials(topic.assignee)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-900">{topic.assignee}</span>
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="col-span-1">
                    <span className={`text-sm font-medium ${getPriorityColor(topic.priority)}`}>
                      {topic.priority}
                    </span>
                  </div>

                  {/* Updated */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-500">
                      {new Date(topic.updated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredTopics.length} of {topics.length} topics</span>
          <div className="flex items-center space-x-2">
            <span>View:</span>
            <button className="text-blue-600 hover:text-blue-800">List</button>
            <span>|</span>
            <button className="text-gray-500 hover:text-gray-700">Board</button>
          </div>
        </div>
      </div>

      {/* Create Topic Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Create Topic</h2>
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleCreateTopic} className="p-6">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter topic title..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the topic requirements and functionality..."
                  />
                </div>

                {/* Category and Priority Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Features">Features</option>
                      <option value="Authentication">Authentication</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="Admin">Admin</option>
                      <option value="Payment">Payment</option>
                      <option value="Analytics">Analytics</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                {/* Assignee */}
                <div>
                  <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-2">
                    Assignee
                  </label>
                  <select
                    id="assignee"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Mike Johnson">Mike Johnson</option>
                    <option value="Sarah Wilson">Sarah Wilson</option>
                    <option value="David Brown">David Brown</option>
                    <option value="Lisa Garcia">Lisa Garcia</option>
                    <option value="Tom Anderson">Tom Anderson</option>
                    <option value="Emma Davis">Emma Davis</option>
                    <option value="Alex Martinez">Alex Martinez</option>
                    <option value="Chris Taylor">Chris Taylor</option>
                    <option value="Rachel White">Rachel White</option>
                    <option value="Kevin Lee">Kevin Lee</option>
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Create Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topics;