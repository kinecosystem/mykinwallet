import styled from 'styled-components';
import media from 'common/breakpoints';
import { flexRow } from 'common/mixin';

export const LoaderStyle = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.5);
	left: 0;
	top: 0;
	z-index: 110;
	display: ${({ visible }) => !visible && 'none'};
`;
