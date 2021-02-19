export default class UserNotFoundError extends Error {
  constructor() {
    super();
    this.name = 'UserNotFoundError';
    this.message = 'User not found';
  }
}
