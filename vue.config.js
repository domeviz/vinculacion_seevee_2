const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
  ,

  devServer: {
        port: 3000,
        proxy: {
            '/API/SEVEE/V1': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true
            }
        }
    }


})
// module.exports = {
//   // https://cli.vuejs.org/config/#devserver-proxy
//   devServer: {
//       port: 3000,
//       proxy: {
//           '^/api': {
//               target: 'http://localhost:8085',
//               ws: true,
//               changeOrigin: true
//           }
//       }
//   }
// }