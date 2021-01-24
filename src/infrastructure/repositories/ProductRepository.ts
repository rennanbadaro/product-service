import Knex from 'knex';
import Product from '../../domain/product/Product';
import DataProvider from '../storage/DataProvider';

interface IProductRepository {
  fetchAll(): Promise<Product[]>;
}

class ProductRepository implements IProductRepository {
  private readonly dbConn: Knex;

  constructor(dbProvider: DataProvider) {
    this.dbConn = dbProvider.getConnection();
  }

  async fetchAll() {
    const result = await this.dbConn.select('*').from('product');

    return result.map(r => new Product(r));
  }
}

export { IProductRepository, ProductRepository };
