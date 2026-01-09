interface TOCItem {
  level: number;
  text: string;
  id: string;
}

interface TOCProps {
  items: TOCItem[];
}

export default function TOC({ items }: TOCProps) {
  const handleClick = (id: string) => {
    const element = document.querySelector(`[id="${CSS.escape(id)}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav aria-label="Table of contents" className="p-4">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        Table of Contents
      </h2>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li
            key={index}
            style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
          >
            <button
              onClick={() => handleClick(item.id)}
              className="text-left w-full py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              style={{
                fontSize: item.level === 1 ? '0.95rem' : '0.875rem',
                fontWeight: item.level <= 2 ? '500' : '400',
              }}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
