import { ProductOutPort } from '../../../infrastructure/adapters/ProductAdapter';
import Discount from '../Discount';
import Product from '../Product';

class FetchProductsWithDiscount {
  constructor(private readonly productAdapter: ProductOutPort) {}

  async execute(userId: string) {
    const products = await this.productAdapter.fetchProducts();

    const productsWithDiscountPromises = products.map(product =>
      this.productAdapter
        .fetchDiscount(userId, product.id)
        .then(discount => this.applyDiscount(product, discount))
    );

    return Promise.all(productsWithDiscountPromises);
  }

  private applyDiscount(product: Product, discount: Discount) {
    if (discount === null) {
      return product;
    }

    return new Product({ ...product, discount });
  }
}

export default FetchProductsWithDiscount;
