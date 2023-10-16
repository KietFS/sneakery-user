const apiURl: Object = {
  development: 'https://sneakery.herokuapp.com/api/',
  production: 'https://sneakery.herokuapp.com/api/',
}

export const Config = {
  isDev: true,
  // @ts-ignore
  API_URL: apiURl[process.env.NODE_ENV],
}
