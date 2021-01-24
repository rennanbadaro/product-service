import Discount from '../../domain/product/Discount';
import Product from '../../domain/product/Product';

interface ProductAdapter {
  fetchProducts(): Promise<Product[]>;
  fetchDiscount(userId: string, productId: string): Promise<Discount | null>;
}

export default ProductAdapter;
