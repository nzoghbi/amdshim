const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const outputDir = path.join(__dirname, "dist");
const srcDir = path.join(__dirname, "src");

const common = {
	context: srcDir,
	resolve: {
		root: [
			path.join(__dirname, "src"),
		],
		alias: {
			template: path.join(__dirname, "template") 
		}	
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
			{test: /\.tpl.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
			{test: /\.css$/, exclude: /\.tpl.css$/, loader: "style!css-loader" },
			{test: /\.js?$/, 
			include: [
				srcDir,
			],
			exclude: /(node_modules|bower_components)/, loader: 'babel', query: {
				cacheDirectory: true, 
				presets: ['es2015', 'react', 'stage-0'],
				plugins: ["transform-async-to-generator", "transform-object-rest-spread"],
			}}				
		],
	},
}

const lib = merge(common, {
	entry: {
		'react-color.amd': "react-color",
		'velocity-react.amd': 'velocity-react',
		'draft-js-export-html.amd': 'draft-js-export-html',
		'webrtc-adapter.amd': 'webrtc-adapter',
		'debug.amd': 'debug',
	},	
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true, compress: {warnings: false, dead_code: true}}),
	],		
})

module.exports = [lib];