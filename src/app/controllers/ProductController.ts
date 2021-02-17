import { Context, Next } from 'koa';
import FetchProductsWithDiscount from '../../domain/product/use-cases/FetchProductsWithDiscount';

class ProductController {
  constructor(
    private readonly fetchProductsWithDiscountUseCase: FetchProductsWithDiscount
  ) {}

  async fetchProductsWithDiscount(ctx: Context, next: Next) {
    const { user } = ctx;

    const result = await this.fetchProductsWithDiscountUseCase.execute(user.id);

    ctx.response.status = 200;
    ctx.response.body = result;
  }
}

export default ProductController;
