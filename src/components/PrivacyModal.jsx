import React from 'react';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-900'>Privacy Policy</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          <div className='text-sm text-gray-600 space-y-4'>
            <p className='text-gray-500 italic'>
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                1. Information We Collect
              </h3>
              <p className='mb-2'>
                We collect information you provide directly to us, such as:
              </p>
              <ul className='list-disc list-inside ml-4 space-y-1'>
                <li>
                  Essay content and writing samples you submit for feedback
                </li>
                <li>Reading comprehension responses</li>
                <li>Vocabulary practice data</li>
                <li>Usage patterns and preferences</li>
              </ul>
            </section>

            <section>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                2. How We Use Your Information
              </h3>
              <p className='mb-2'>We use the collected information to:</p>
              <ul className='list-disc list-inside ml-4 space-y-1'>
                <li>Provide AI-powered feedback on your TOEFL practice</li>
                <li>Improve our AI models and services</li>
                <li>Personalize your learning experience</li>
                <li>Track your progress and performance</li>
                <li>Provide customer support</li>
              </ul>
            </section>

            <section>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                3. Data Storage and Security
              </h3>
              <p className='mb-2'>Your data is:</p>
              <ul className='list-disc list-inside ml-4 space-y-1'>
                <li>Stored securely using industry-standard encryption</li>
                <li>Processed by OpenAI's secure API for AI feedback</li>
                <li>
                  Not shared with third parties except as required for service
                  provision
                </li>
                <li>Retained only as long as necessary for service delivery</li>
              </ul>
            </section>

            <section>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                4. Your Rights
              </h3>
              <p className='mb-2'>You have the right to:</p>
              <ul className='list-disc list-inside ml-4 space-y-1'>
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>
                  Opt out of data collection (though this may limit service
                  functionality)
                </li>
              </ul>
            </section>

            <section>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                5. Cookies and Tracking
              </h3>
              <p>
                We use essential cookies to maintain your session and improve
                your experience. We do not use tracking cookies for advertising
                purposes.
              </p>
            </section>

            <section>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                6. Contact Us
              </h3>
              <p>
                If you have questions about this Privacy Policy, please contact
                us at:
              </p>
              <p className='mt-2'>
                <strong>Email:</strong> ikromjon98.98@icloud.com
                <br />
                <strong>GitHub:</strong>{' '}
                <a
                  href='https://github.com/ikromjon1998'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:text-blue-800'
                >
                  github.com/ikromjon1998
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className='flex justify-end p-6 border-t border-gray-200'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
