import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const Work = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    'document1.pdf',
    'image1.png',
    'spreadsheet1.xlsx',
    'presentation1.pptx',
    'more uploads.png'
  ]);
  const [issues, setIssues] = useState([
    'File upload validation not working properly',
    'Chat functionality needs responsive design fixes',
    'Performance issues on large file uploads',
    'image is blur',
    "remove racism"
  ]);
  const [textContent, setTextContent] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles([...uploadedFiles, file.name]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Text Area for Writing and Upload */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-6 h-48">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-800">Text area to write and upload files</h3>
          <label className="bg-blue-600 text-white px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-700 flex items-center space-x-1">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>
        </div>
        <textarea 
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Write your content here..."
          className="w-full h-32 p-3 border border-gray-200 rounded resize-none focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex space-x-6">
        {/* Uploaded Files Section */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 w-80 h-64">
          <h3 className="font-medium text-gray-800 mb-3">All the uploaded files displayed here</h3>
          <div className="space-y-2 overflow-y-auto max-h-45">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-xs font-medium">
                    {file.split('.').pop()?.toUpperCase() ?? ''}

                  </span>
                </div>
                <span className="text-sm text-gray-700 truncate">{file}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Issues Section */}
    <div className="flex-1">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-4">Issues found by admin</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {issues.map((issue, index) => (
                <div key={index} className={`border rounded p-3 ${
                  index % 3 === 0 ? 'bg-red-50 border-red-200' : 
                  index % 3 === 1 ? 'bg-yellow-50 border-yellow-200' : 
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm font-medium mb-1 ${
                        index % 3 === 0 ? 'text-red-700' : 
                        index % 3 === 1 ? 'text-yellow-700' : 
                        'text-blue-700'
                      }`}>
                        Issue #{index + 1}
                      </p>
                      <p className={`text-sm ${
                        index % 3 === 0 ? 'text-red-600' : 
                        index % 3 === 1 ? 'text-yellow-600' : 
                        'text-blue-600'
                      }`}>
                        {issue}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      index % 3 === 0 ? 'bg-red-100 text-red-700' : 
                      index % 3 === 1 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {index % 3 === 0 ? 'High' : index % 3 === 1 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </div>
              ))}
              {issues.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No issues found yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;