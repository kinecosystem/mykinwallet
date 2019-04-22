import styled from 'styled-components';
import media from 'common/breakpoints';

export const Grid = styled.div`
	max-width: 90%;
	width: 100%;
	margin: 0 auto;
	height: 100%;
	z-index: 1;
    position: relative;
    padding-bottom:102px;
	${media.sm`
    max-width:95%;
    `}
	${media.md`
    max-width:690px;
    padding-bottom:60px;
    `}
	${media.lg`
        padding-bottom:102px;
        max-width:922px;
    `}
	${media.xl`
        max-width:1206px;
    `}
`;
