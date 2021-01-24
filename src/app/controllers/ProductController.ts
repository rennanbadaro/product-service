import { Context } from 'koa';
import FetchProductsWithDiscount from '../../domain/product/use-cases/FetchProductsWithDiscount';

class ProductController {
    constructor(
        private readonly fetchProductsWithDiscountUseCase: FetchProductsWithDiscount;
    ) {}

    fetchProductsWithDiscount(ctx: Context) {
        const { userId } = ctx

        const result = await this.fetchProductsWithDiscountUseCase.execute(userId);

        ctx.response.status = 200;
        ctx.response.body = result;
    }
}
