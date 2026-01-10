interface SlideButtonProps {
  isSlideMode: boolean;
  onToggle: () => void;
  isFullscreen: boolean;
}

export default function SlideButton({
  isSlideMode,
  onToggle,
  isFullscreen,
}: SlideButtonProps) {
  // Only show button in fullscreen mode
  if (!isFullscreen) {
    return null;
  }

  return (
    <button
      onClick={onToggle}
      className="fixed top-20 right-4 z-50 w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg flex items-center justify-center transition-colors"
      aria-label={isSlideMode ? 'Exit slide mode' : 'Enter slide mode'}
      title={isSlideMode ? 'Exit slide mode' : 'Enter slide mode'}
    >
      {isSlideMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
}
