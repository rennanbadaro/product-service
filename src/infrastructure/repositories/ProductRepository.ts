import Product from '../../domain/product/Product';

interface IProductRepository {
  fetchAll(): Promise<Product[]>;
}

export { IProductRepository };
