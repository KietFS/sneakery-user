const apiURl: Object = {
  development: 'https://sneakery-develop-4ba9beca2712.herokuapp.com',
  production: 'https://sneakery-develop-4ba9beca2712.herokuapp.com',
}

export const Config = {
  isDev: true,
  // @ts-ignore
  API_URL: apiURl[process.env.NODE_ENV],
}
