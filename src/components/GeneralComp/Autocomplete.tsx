import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProductSuggestion {
  _id: string;
  name: string;
}

const AutocompleteSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      axios
        .get<ProductSuggestion[]>(`/api/products/search/autocomplete?query=${encodeURIComponent(query)}`)
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((err) => {
          console.error('Autocomplete error:', err);
        });
    }, 300);

    setTypingTimeout(timeout);
  }, [query]);

  return (
    <div className="relative">
      <input
        className="border border-gray-300 p-2 rounded w-full"
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full rounded shadow mt-1 max-h-60 overflow-auto">
          {suggestions.map((product) => (
            <li
              key={product._id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                window.location.href = `/product/${product._id}`;
              }}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;
