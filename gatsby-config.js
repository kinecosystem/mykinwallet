const path = require('path');
module.exports = {
	siteMetadata: {
		title: `Coin transfer system`,
		description: `Kin coins transfer system`,
		author: `@KIN`
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		`gatsby-plugin-styled-components`,
		'gatsby-plugin-antd',
		`gatsby-plugin-typescript`,
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-136101659-2',
				head: true
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		{
			resolve: 'gatsby-plugin-root-import',
			options: {
				src: path.join(__dirname, 'src'),
				common: path.join(__dirname, 'src/style/common'),
				images: path.join(__dirname, 'src/images'),
				style: path.join(__dirname, 'src/style')
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /assets/
				}
			}
		}
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	]
};
