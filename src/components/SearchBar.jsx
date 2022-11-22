import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ setQuery }) => {
  // Debounce input
  const debounce = (cb, delay = 500) => {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  // Update text based on input
  const updateQuery = debounce((text) => {
    setQuery(text);
  });

  return (
    <div className="relative group text-gray-300 transition-all focus-within:text-black">
      <input
        className="p-4 border-2 rounded w-full"
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => updateQuery(e.target.value)}
      />

      <BsSearch className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
};

export default SearchBar;
