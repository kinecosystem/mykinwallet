import { css } from 'styled-components';
// const xs = content =>
//   ` @media (max-width: 320px) {
//         ${content};
//     }`;
// const sm = content =>
//   ` @media (max-width: 576px) {
//         ${content};
//     }`;
// const md = content =>
//   ` @media (max-width: 768pxs) {
//         ${content};
//     }`;
// const lg = content =>
//   ` @media (max-width: 992px) {
//         ${content};
//     }`;
// const xl = content =>
//   ` @media (min-width: 1366px) {
//         ${content};
//     }`;

interface IMedia {
	xs?: any;
	sm?: any;
	md?: any;
	lg?: any;
	xl?: any;
}

const sizes = {
	xs: 320,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1366
};

const media: IMedia = Object.keys(sizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (min-width: ${sizes[label]}px) {
			${css(...args)}
		}
	`;

	return acc;
}, {});

export default media;
