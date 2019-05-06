import styled from 'styled-components';
import media from 'common/breakpoints';
import { flexRow } from 'common/mixin';

export const LoaderStyle = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(245, 245, 255, 0.7);
	left: 0;
	top: 0;
	z-index: 110;
	display: ${({ visible }) => (!visible ? 'none' : 'flex')};
	justify-content: center;
	flex-direction: row;
	align-items: center;
	.loader-5 {
		height: 52px;
		width: 52px;
		-webkit-animation: loader-5-1 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
		animation: loader-5-1 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
	}
	@-webkit-keyframes loader-5-1 {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	@keyframes loader-5-1 {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.loader-5::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: auto;
		margin: auto;
		width: 15px;
		height: 15px;
		background: ${({ theme }) => theme.purple};
		border-radius: 50%;
		-webkit-animation: loader-5-2 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
		animation: loader-5-2 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
	}
	@-webkit-keyframes loader-5-2 {
		0% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			-webkit-transform: translate3d(55px, 0, 0) scale(0.5);
		}
		100% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
	}
	@keyframes loader-5-2 {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(55px, 0, 0) scale(0.5);
		}
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
	}
	.loader-5::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: auto;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 15px;
		height: 15px;
		background: ${({ theme }) => theme.purple};
		border-radius: 50%;
		-webkit-animation: loader-5-3 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
		animation: loader-5-3 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
	}
	@-webkit-keyframes loader-5-3 {
		0% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			-webkit-transform: translate3d(-55px, 0, 0) scale(0.5);
		}
		100% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
	}
	@keyframes loader-5-3 {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(-55px, 0, 0) scale(0.5);
		}
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
	}
	.loader-5 span {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		height: 52px;
		width: 52px;
	}
	.loader-5 span::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		bottom: auto;
		right: 0;
		margin: auto;
		width: 15px;
		height: 15px;
		background: ${({ theme }) => theme.purple};
		border-radius: 50%;
		-webkit-animation: loader-5-4 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
		animation: loader-5-4 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
	}
	@-webkit-keyframes loader-5-4 {
		0% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			-webkit-transform: translate3d(0, 55px, 0) scale(0.5);
		}
		100% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
	}
	@keyframes loader-5-4 {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(0, 55px, 0) scale(0.5);
		}
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
	}
	.loader-5 span::after {
		content: '';
		display: block;
		position: absolute;
		top: auto;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 15px;
		height: 15px;
		background: ${({ theme }) => theme.purple};
		border-radius: 50%;
		-webkit-animation: loader-5-5 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
		animation: loader-5-5 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
	}
	@-webkit-keyframes loader-5-5 {
		0% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			-webkit-transform: translate3d(0, -55px, 0) scale(0.5);
		}
		100% {
			-webkit-transform: translate3d(0, 0, 0) scale(1);
		}
	}
	@keyframes loader-5-5 {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(0, -55px, 0) scale(0.5);
		}
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
	}
`;
