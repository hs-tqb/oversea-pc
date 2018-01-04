let config = {
  development: {
    number: '1.0.1 alpha',
    type  : '开发版'
  },
  test: {
    number: '1.0.0 alpha',
    type  : '测试版'
  },
  production: {
    number: '1.0.0',
    type  : '正式版'
  }
}

export default config[process.env.NODE_ENV];