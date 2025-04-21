import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState, useCallback, useRef } from 'react';
import { X, Search as SearchIcon, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { productService } from '../../../api/services/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
  _id: string;
  name: string;
  price?: number;
  thumbnail?: string;
  category?: string;
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'suggestions' | 'results'>('suggestions');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cancel pending requests on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSuggestions([]);
      setSearchResults([]);
      setError(null);
      setActiveTab('suggestions');
    }
  }, [isOpen]);

  // Debounced autocomplete fetch
  const fetchSuggestions = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setSuggestions([]);
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      setError(null);

      try {
        const data = await productService.autocomplete(term, {
          signal: abortControllerRef.current.signal
        });
        setSuggestions(data);
        setActiveTab('suggestions');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Autocomplete error:', err);
          setError('Failed to load suggestions');
        }
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Handle search term changes
  useEffect(() => {
    fetchSuggestions(searchTerm);
    return () => fetchSuggestions.cancel();
  }, [searchTerm, fetchSuggestions]);

  // Perform full search
  const performSearch = async (term: string) => {
    if (!term.trim()) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsSearching(true);
    setError(null);

    try {
      const { data } = await productService.search(term, 1, 10, {
        signal: abortControllerRef.current.signal
      });
      setSearchResults(data);
      setActiveTab('results');
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Search error:', err);
        setError('Failed to perform search');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  const handleSuggestionClick = (item) => {
    onClose();
    navigate(`/category/${item.productType?.name}/${item.name}`);
    console.log('Suggestion clicked!',item);
  };

  const handleViewAllResults = () => {
    onClose();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const displayResults = activeTab === 'results' ? searchResults : suggestions;
  const showEmptyState = !isLoading && 
                        !isSearching && 
                        searchTerm && 
                        displayResults.length === 0;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-24 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              leave="ease-in duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                    Search Products
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {isLoading || isSearching ? (
                        <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                      ) : (
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                      placeholder="Search for products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  </div>
                </form>

                <div className="mt-4">
                  {/* Error state */}
                  {error && (
                    <div className="text-center py-6 text-red-500 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Loading state */}
                  {(isLoading || isSearching) && displayResults.length === 0 && (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  )}

                  {/* Results tabs */}
                  {displayResults.length > 0 && (
                    <>
                      <div className="flex border-b border-gray-200 mb-4">
                        <button
                          className={`px-4 py-2 text-sm font-medium ${
                            activeTab === 'suggestions'
                              ? 'border-b-2 border-black text-black'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab('suggestions')}
                        >
                          Suggestions
                        </button>
                        {searchResults.length > 0 && (
                          <button
                            className={`px-4 py-2 text-sm font-medium ${
                              activeTab === 'results'
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('results')}
                          >
                            Full Results
                          </button>
                        )}
                      </div>

                      <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                        {displayResults.map((item) => (
                          <li
                            key={item._id}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => handleSuggestionClick(item)}
                          >
                            <div className="flex items-center space-x-4">
                              {item.thumbnail && (
                                <div className="flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-md object-cover"
                                    src={item.thumbnail}
                                    alt={item.name}
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.name}
                                </p>
                                {item.price && (
                                  <p className="text-sm text-gray-500">
                                    Rs.{item.price.toFixed(2)}
                                  </p>
                                )}
                                {item.category && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    {item.category}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {activeTab === 'results' && searchResults.length > 0 && (
                        <div className="mt-4 text-center">
                          <button
                            onClick={handleViewAllResults}
                            className="text-sm font-medium text-black hover:underline"
                          >
                            View all {searchResults.length}+ results
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Empty state */}
                  {showEmptyState && (
                    <div className="text-center py-6">
                      <p className="text-sm text-gray-500">
                        No results found for "<span className="font-medium">{searchTerm}</span>"
                      </p>
                      <button
                        onClick={() => performSearch(searchTerm)}
                        className="mt-2 text-sm font-medium text-black hover:underline"
                      >
                        Try a more detailed search
                      </button>
                    </div>
                  )}
                </div>

                {/* Popular searches */}
                {!searchTerm && (
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Popular Searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Phone Skins', 'Laptop Wraps', 'Matte Finish', 'Glossy Finish'].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchTerm(term)}
                          className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}