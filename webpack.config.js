const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const outputDir = path.join(__dirname, "dist");
const srcDir = path.join(__dirname, "shim");

const common = {
	context: srcDir,
	resolve: {
		root: [
			srcDir,
		],
	},
	resolveLoader: { root: path.join(__dirname, "node_modules") },
	output: {
		// Make sure to use [name] or [id] in output.filename
		//  when using multiple entry points
		path: outputDir,
		//library: "[name]",
		//publicPath: publicPath + '/[hash]',
		filename: "[name].min.js",
		//chunkFilename: "[name][id].js",
		libraryTarget: "amd"			
	},	
	externals: [
		{
			'draft-js': true,
			emojione: true,
			immutable: true,
			lodash: true,
			'msgpack-lite': true,			
			'react': true,
			'react-addons-shallow-compare': true,
			'react-addons-transition-group': true,
			'react-dom': true,
			'velocity-animate': true,	
			velocityui: true,		
		},
	],
	module: {
		loaders: [
			{test: /\.js?$/, 
			include: [
				srcDir,
			],
			loader: 'babel', query: {
				cacheDirectory: true, 
				presets: ['es2015'],
			}}				
		],
	},
}

module.exports = merge(common, {
	entry: {
		'draft-js-export-html.amd': 'draft-js-export-html',
		'debug.amd': 'debug',
		'react-color.amd': "react-color",
		'react-lazyload.amd': 'react-lazyload.shim',		
		'velocity-react.amd': 'velocity-react',
		'webrtc-adapter.amd': 'webrtc-adapter',
	},	
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true, compress: {warnings: false, dead_code: true}}),
	],		
});