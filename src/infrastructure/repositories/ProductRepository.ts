import Knex from 'knex';
import { camelCase } from 'change-case-object';

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
    const result = await this.dbConn.select('*').from('products');

    return result.map((r: Product) => new Product(camelCase(r) as Product));
  }
}

export { IProductRepository, ProductRepository };
