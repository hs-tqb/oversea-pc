const path = require('path')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'oversea-pc',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // 直接用cdn外链引入, 不输出页面
      // { rel:'stylesheet', href:"https://unpkg.com/element-ui@2.0.8/lib/theme-chalk/index.css" }
    ],
    script: [
      // { src:'https://unpkg.com/element-ui@2.0.8/lib/index.js' }
    ]
  },
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    { src: '~assets/css/main.scss', lang:'scss' }
  ],
  plugins:[
    { src: '~plugins/element-ui' }
  ],
  // 代理
  // proxy: {
  //   '/api': {
  //     pathRewrite: {'^/api': '/api'},
  //     target: 'http://127.0.0.1:5555'
  //   }
  // },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  env: {
    PATH_TYPE: process.env.PATH_TYPE
  },
  // generate: {
  //   dir:'seller2'
  // },
  build: {
    // publicPath:'/seller2/_nuxt/',
    extractCSS:true,  // 打包css
    vendor: ['axios', 'element-ui'],
    babel: {
      plugins: [['component', [
        {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk' // 2.0.8
          // 'styleLibraryName': 'theme-default' // 1.4
        },
        'transform-async-to-generator',
        'transform-runtime'
      ]]],
      comments: false
    },
    /*
    ** Run ESLint on save
    */
    // extend (config, ctx) {
    //   if (ctx.dev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
