"use client"
import { useState, useEffect } from "react";
import { X, ChevronDown, Check } from "lucide-react";

const ProjectFormModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    type: 'Software',
    description: '',
    members: 1,
    selectedEmployees: []
  });

  const [employeeList, setEmployeeList] = useState([]);
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/employees')
      .then(res => res.json())
      .then(data => setEmployeeList(data.employees))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const projectTypes = ['Software', 'Design', 'Analytics', 'Marketing', 'Backend', 'Security', 'DevOps'];
  const gradientColors = [
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-orange-400 to-orange-600',
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-teal-400 to-teal-600',
    'bg-gradient-to-br from-red-400 to-red-600',
    'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-cyan-400 to-cyan-600'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateProjectKey = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 4);
  };

  const handleEmployeeSelect = (employee) => {
    setFormData(prev => {
      const isSelected = prev.selectedEmployees.some(emp => emp.id === employee.id);
      return {
        ...prev,
        selectedEmployees: isSelected
          ? prev.selectedEmployees.filter(emp => emp.id !== employee.id)
          : [...prev.selectedEmployees, employee]
      };
    });
  };

  const handleCreateProject = () => {
    if (!formData.name.trim()) return alert('Project name is required');
    if (!formData.type) return alert('Project type is required');

    const newProject = {
      id: Date.now(),
      name: formData.name,
      key: formData.key || generateProjectKey(formData.name),
      type: formData.type,
      members: formData.selectedEmployees.length || parseInt(formData.members) || 1,
      issues: 0,
      progress: 0,
      color: gradientColors[Math.floor(Math.random() * gradientColors.length)],
      assignedEmployees: formData.selectedEmployees
    };

    onCreate(newProject);
    onClose();
    setFormData({
      name: '',
      key: '',
      type: 'Software',
      description: '',
      members: 1,
      selectedEmployees: []
    });
    setIsEmployeeDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
              <p className="text-gray-600 text-sm mt-1">Set up your project to start tracking progress</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
                placeholder="Enter project name..."
              />
            </div>

            {/* Project Key and Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="key" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Key
                </label>
                <input
                  type="text"
                  id="key"
                  name="key"
                  value={formData.key}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm uppercase"
                  placeholder={formData.name ? generateProjectKey(formData.name) : "AUTO"}
                  maxLength="10"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
                >
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
                placeholder="Describe your project goals..."
              />
            </div>

            {/* Assign Employees */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Assign Team Members <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm flex items-center justify-between bg-white"
                >
                  <span>
                    {formData.selectedEmployees.length === 0
                      ? "Select team members..."
                      : `${formData.selectedEmployees.length} selected`}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 ${isEmployeeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isEmployeeDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {employeeList.length > 0 ? (
                      employeeList.map((employee) => (
                        <div
                          key={employee.id}
                          onClick={() => handleEmployeeSelect(employee)}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{employee.name || employee.username}</div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                          {formData.selectedEmployees.some(emp => emp.id === employee.id) && (
                            <Check className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">No employees available</div>
                    )}
                  </div>
                )}
              </div>

              {/* Preview selected */}
              {formData.selectedEmployees.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.selectedEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      <span>{employee.name || employee.username}</span>
                      <button
                        type="button"
                        onClick={() => handleEmployeeSelect(employee)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

         
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateProject}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormModal;
