// const path = require('path')
// const resolve = (dir) => path.join(__dirname, dir)
// const BASE_URL = process.env.NODE_ENV === 'procution' ? '/iview-admin/' : '/'

module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
	devServer: {
		proxy: 'http://localhost:3000',
	},
}
