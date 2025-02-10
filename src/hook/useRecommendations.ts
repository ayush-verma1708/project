import { useCart } from '../context/CartContext';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../api';
import { CartItem as CartItemType, Product } from '../types/types';

// Hook to generate product recommendations
export function useRecommendations() {
  const { state } = useCart();

  // Fetch all products
  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });

  // Function to generate bundle recommendations based on similar price range
  const getBundleRecommendations = (currentItem: CartItemType): Product[] => {
    return products.filter(
      (product) =>
        product._id !== currentItem._id &&
        Math.abs(product.price - currentItem.price) <= 100
    );
  };

  // Aggregate recommendations from all cart items and remove duplicates
  const recommendedProducts: Product[] = [];
  state.items.forEach((item) => {
    const recs = getBundleRecommendations(item);
    recs.forEach((rec) => {
      if (!recommendedProducts.some((prod) => prod._id === rec._id)) {
        recommendedProducts.push(rec);
      }
    });
  });

  // Limit the recommended products to 4 items
  return {
    recommendedProducts: recommendedProducts.slice(0, 4),
    isLoading,
    isError,
  };
}
