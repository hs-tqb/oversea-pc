let config = {
  development: {
    baseURL:'http://localhost:5555/',
    // baseURL:'http://ts.baotianqi.cn/',
  },
  test: {
    baseURL:'http://ts.baotianqi.cn/',
  },
  production: {
    baseURL:'http://ts.baotianqi.cn/',
  }
}
export default config[process.env.PATH_TYPE || process.env.NODE_ENV];
