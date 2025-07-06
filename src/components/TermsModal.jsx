import React from 'react';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
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
          <div className="text-sm text-gray-600 space-y-4">
            <p className="text-gray-500 italic">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
              <p>By accessing and using the TOEFL AI Assistant, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Description of Service</h3>
              <p className="mb-2">The TOEFL AI Assistant provides:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>AI-powered essay feedback and writing assistance</li>
                <li>Reading comprehension practice exercises</li>
                <li>Vocabulary training and practice</li>
                <li>Educational resources for TOEFL preparation</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. User Responsibilities</h3>
              <p className="mb-2">You agree to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide accurate and truthful information</li>
                <li>Use the service for educational purposes only</li>
                <li>Not attempt to reverse engineer or hack the service</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Intellectual Property</h3>
              <p>The TOEFL AI Assistant and its original content, features, and functionality are owned by the creator and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Disclaimer of Warranties</h3>
              <p>The service is provided "as is" and "as available" without any warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Limitation of Liability</h3>
              <p>In no event shall the creator be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Third-Party Services</h3>
              <p>This service uses OpenAI's API for AI functionality. By using this service, you also agree to OpenAI's terms of service and privacy policy.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Modifications to Terms</h3>
              <p>We reserve the right to modify these terms at any time. We will notify users of any material changes by updating the "Last updated" date at the top of this page.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Contact Information</h3>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <p className="mt-2">
                <strong>Email:</strong> ikromjon98.98@icloud.com<br />
                <strong>GitHub:</strong> <a href="https://github.com/ikromjon1998" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">github.com/ikromjon1998</a>
              </p>
            </section>
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

export default TermsModal; 