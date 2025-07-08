import React from 'react';

// Types
interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

interface HeaderProps {
  currentPage: string;
  onPageChange: (pageId: string) => void;
}

interface NavigationButtonProps {
  item: NavigationItem;
  onClick: (id: string) => void;
  className: string;
}

interface DesktopNavigationProps {
  currentPage: string;
  onPageChange: (pageId: string) => void;
}

interface MobileNavigationProps {
  currentPage: string;
  onPageChange: (pageId: string) => void;
}

// Constants
const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { id: 'home', label: '🏠 Home', icon: '🏠' },
  { id: 'writing', label: '✍️ Writing', icon: '✍️' },
  { id: 'reading', label: '📖 Reading', icon: '📖' },
  { id: 'vocabulary', label: '🧠 Vocabulary', icon: '🧠' },
];

const APP_TITLE = '📘 TOEFL AI Assistant';

// Utility functions
type GetNavButtonClasses = (isActive: boolean) => string;
const getNavButtonClasses: GetNavButtonClasses = isActive => {
  const baseClasses =
    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200';
  const activeClasses = 'bg-blue-100 text-blue-700';
  const inactiveClasses = 'text-gray-600 hover:text-blue-600 hover:bg-blue-50';

  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};

const getMobileNavButtonClasses: GetNavButtonClasses = isActive => {
  const baseClasses =
    'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200';
  const activeClasses = 'bg-blue-100 text-blue-700';
  const inactiveClasses = 'text-gray-600 hover:text-blue-600 hover:bg-blue-50';

  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};

// Sub-components
const NavigationButton: React.FC<NavigationButtonProps> = ({ item, onClick, className }) => (
  <button type="button" key={item.id} onClick={() => onClick(item.id)} className={className}>
    {item.label}
  </button>
);

const MobileMenuButton: React.FC = () => (
  <button
    type='button'
    className='text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600'
    aria-label='Open menu'
  >
    <svg
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 6h16M4 12h16M4 18h16'
      />
    </svg>
  </button>
);

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ currentPage, onPageChange }) => (
  <nav className='hidden md:flex space-x-8'>
    {NAVIGATION_ITEMS.map(item => (
      <NavigationButton
        key={item.id}
        item={item}
        onClick={onPageChange}
        className={getNavButtonClasses(currentPage === item.id)}
      />
    ))}
  </nav>
);

const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentPage, onPageChange }) => (
  <div className='md:hidden'>
    <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
      {NAVIGATION_ITEMS.map(item => (
        <NavigationButton
          key={item.id}
          item={item}
          onClick={onPageChange}
          className={getMobileNavButtonClasses(currentPage === item.id)}
        />
      ))}
    </div>
  </div>
);

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  return (
    <header className='bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-blue-600'>{APP_TITLE}</h1>
          </div>

          <DesktopNavigation
            currentPage={currentPage}
            onPageChange={onPageChange}
          />

          <div className='md:hidden'>
            <MobileMenuButton />
          </div>
        </div>

        <MobileNavigation
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </header>
  );
};

export default Header; 