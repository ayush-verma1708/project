
// SearchResultsPage.tsx
export function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [page, setPage] = useState(1);
    const [results, setResults] = useState<PaginatedResponse<Product>>({
      data: [],
      pagination: { total: 0, page: 1, pages: 1, limit: 12 }
    });
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const fetchResults = async () => {
        if (!query) return;
        
        setIsLoading(true);
        try {
          const data = await productService.search(query, page, 12);
          setResults(data);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchResults();
    }, [query, page]);
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Search Results for "{query}"
          {results.pagination.total > 0 && (
            <span className="text-gray-500 font-normal ml-2">
              ({results.pagination.total} products)
            </span>
          )}
        </h1>
  
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
          </div>
        ) : results.data.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {results.data.map((product) => (
                <ProductCard 
                  key={product._id}
                  product={product}
                  onClick={() => navigate(`/products/${product._id}`)}
                />
              ))}
            </div>
  
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={results.pagination.pages}
                onPageChange={setPage}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg">No products found matching your search</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    );
  }
  
  // Pagination.tsx
  interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
      <nav className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
  
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
  
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-full ${
                currentPage === pageNum
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
  
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>
    );
  }