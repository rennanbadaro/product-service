enum Dependencies {
  POSTGRE_PROVIDER = 'postgreProvider',
  REDIS_PROVIDER = 'redisProvider',

  PRODUCT_REPOSITORY = 'productRepository',
  PRODUCT_ADAPTER = 'productAdapter',
  FETCH_PRODUCTS_WITH_DISCOUNT_USE_CASE = 'fetchProductsWithDiscountUseCase',
  PRODUCT_CONTROLLER = 'productController',

  AUTH_SERVICE = 'authService',

  USER_REPOSITORY = 'userRepository',
  USER_ADAPTER = 'userAdapter',
  USER_LOGIN_USE_CASE = 'userLoginUseCase',
  USER_CONTROLLER = 'userController',
}

export default Dependencies;
