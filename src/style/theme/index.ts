import {
	purpleTransed,
	greenLight,
	greenDark,
	ligthTextColor,
	purple,
	purpleLight,
	bodyColor,
	volcanoRed,
	blackish,
	purpleTransedB,
	silverado
} from './generalVariables';

export interface ITheme {
	theme: {
		primaryColor: string;
		textColor: string;
		aboutusHeaderColor: string;
		greenLight: string;
		greenDark: string;
		ligthTextColor: string;
		purple: string;
		purpleLight: string;
		h1: object;
	};
}

const KinTheme = {
	primaryColor: '#6f41e8',
	textColor: '#000000',
	aboutusHeaderColor: '#fe8000',
	darkText: '#1F1F1F',
	greenLight,
	greenDark,
	ligthTextColor,
	purple,
	purpleLight,
	bodyColor,
	volcanoRed,
	blackish,
	purpleTransed,
	purpleTransedB,
	silverado,
	h1: {
		desktop: `
			font-size:47px;
			line-height:57px;
		`,
		mobile: `
			font-size:36px;
			line-height:47px;
		`
	},
	h6: {
		desktop: `
			font-size:20px;
			line-height:33px;
		`,
		mobile: `
			font-size:15px;
			line-height:24px;
		`
	},
	h3: {
		desktop: `
			font-size:24px;
			line-height:28px;
		`,
		mobile: `
			font-size:22px;
			line-height:31px;
		`
	},
	smallText: {
		desktop: `
			font-size:12px;
			line-height:23px;
		`,
		mobile: `
			font-size:11px;
			line-height:21px;
		`
	}
};

export default KinTheme;
