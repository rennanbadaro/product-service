import { UserOutPort } from '../../../infrastructure/adapters/UserAdapter';
import { IAuthService } from '../../auth/AuthService';

class UserLogin {
  constructor(
    private readonly authService: IAuthService,
    private readonly userAdapter: UserOutPort
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userAdapter.fetchByEmailAndPassword(
      email,
      password
    );

    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = this.authService.generateToken(user);

    await this.userAdapter.setValidToken(accessToken);

    return accessToken;
  }
}

export default UserLogin;
