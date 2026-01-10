import { useState } from 'react';

interface CollapsibleMenuButtonProps {
  position: 'left' | 'right';
  label: string;
  icon: React.ReactNode;
  isFullscreen: boolean;
  children: React.ReactNode;
}

export default function CollapsibleMenuButton({
  position,
  label,
  icon,
  isFullscreen,
  children,
}: CollapsibleMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isFullscreen) {
    return null;
  }

  const positionClasses =
    position === 'left' ? 'top-4 left-4' : 'top-4 right-20'; // right-20 to avoid overlap with fullscreen button

  const menuPositionClasses =
    position === 'left' ? 'left-0 top-16' : 'right-0 top-16';

  return (
    <div className={`fixed ${positionClasses} z-40`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-lg flex items-center justify-center transition-colors"
        aria-label={label}
        aria-expanded={isOpen}
        title={label}
      >
        {icon}
      </button>

      {isOpen && (
        <div
          className={`fixed ${menuPositionClasses} bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700`}
          onMouseLeave={() => setIsOpen(false)}
          style={{
            maxHeight: 'calc(100vh - 5rem)',
            width: position === 'left' ? '16rem' : '16rem',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
