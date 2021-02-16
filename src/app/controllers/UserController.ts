import { Context, Next } from 'koa';
import UserLogin from '../../domain/user/use-cases/UserLogin';

class UserController {
  constructor(private readonly loginUseCase: UserLogin) {}

  async login(ctx: Context, next: Next) {
    // @ts-ignore
    const { email, password } = ctx.request.body;

    const accessToken = await this.loginUseCase.execute(email, password);

    if (!accessToken) {
      ctx.response.status = 401;
    }

    ctx.response.body = { accessToken };
    ctx.response.status = 200;
  }
}

export default UserController;
