import React from 'react';
import { CREATOR_CONFIG, APP_CONFIG } from '../config/creator';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">About {APP_CONFIG.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* App Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Application</h3>
            <p className="text-gray-600 mb-4">
              {APP_CONFIG.description}. This tool is designed to help TOEFL test takers improve their skills 
              through AI-powered feedback and practice exercises.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Version:</span> <span className="text-gray-600">{APP_CONFIG.version || 'Not set'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Target Audience:</span> <span className="text-gray-600">{APP_CONFIG.targetAudience}</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {APP_CONFIG.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Creator Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Creator</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {CREATOR_CONFIG.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">{CREATOR_CONFIG.name}</h4>
                  <p className="text-sm text-gray-600">{CREATOR_CONFIG.title}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{CREATOR_CONFIG.bio}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="font-medium text-gray-700">Location:</span> <span className="text-gray-600">{CREATOR_CONFIG.location}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Experience:</span> <span className="text-gray-600">{CREATOR_CONFIG.experience}</span>
                </div>
              </div>

              <div>
                <span className="font-medium text-gray-700 text-sm">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {CREATOR_CONFIG.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="font-medium text-gray-700">Project Name:</span> <span className="text-gray-600">{CREATOR_CONFIG.project.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Version:</span> <span className="text-gray-600">{CREATOR_CONFIG.project.version}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{CREATOR_CONFIG.project.description}</p>
              
              <div>
                <span className="font-medium text-gray-700 text-sm">Tech Stack:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {CREATOR_CONFIG.project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href={`mailto:${CREATOR_CONFIG.email}`} className="text-blue-600 hover:text-blue-800">
                  {CREATOR_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <a href={CREATOR_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  GitHub Profile
                </a>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <a href={CREATOR_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal; 