import styled from 'styled-components';
import media from './breakpoints';
import { blackish } from 'style/theme/generalVariables';

export const H1 = styled.h1`
	${({ theme }) => theme.h1.mobile}
	${media.md`
        ${({ theme }) => theme.h1.desktop}
    `}
    font-family:SailecBold;
    color:white;
	margin: 0 0 18px 0;
	${media.md`
        margin: 145px 0 18px 0;
    `}
	${media.lg`
        margin: 124px 0 18px 0;
    `}
	${media.xl`
        margin: 154px 0 18px 0;
    `}
`;

export const H6 = styled.header`
	${({ theme }) => theme.h6.mobile}
	${media.md`
    ${({ theme }) => theme.h6.desktop}
    `}
    font-family:primaryFont;
	margin: 0 0 36px 0;
	font-family: ${({ bold }) => bold && 'sailecBold'};
`;

export const SmallTitle = styled.header`
	${({ theme }) => theme.h6.mobile}
	${media.md`
    ${({ theme }) => theme.h6.desktop}
    `}
    font-family:primaryFont;
	font-family: ${({ bold }) => bold && 'sailecBold'};
	margin: ${({ bold }) => bold && '0 0 36px 0'};
`;

export const H3 = styled.header`
	font-family: SailecBold;
    margin: 0;
	${({ theme }) => theme.h3.mobile}
	${media.md`
    ${({ theme }) => theme.h3.desktop}
    `}
    color: ${({ theme }) => theme.blackish};
`;

export const P = styled.p`
	${({ theme }) => theme.h6.mobile}
	${media.md`
    ${({ theme }) => theme.h6.desktop}
	`}
	font-family:primaryFont;
	color: ${({ theme }) => theme.blackish};
`;

export const A = styled.span`
	color: ${blackish};
	text-decoration: underline;
`;

export const Button = styled.button`
	outline: none;
	border: none;
	background: ${({ theme }) => theme.purple};
	height: 66px;
	width: 100%;
	color: white;
	font-size: 18px;
	${media.xl`
		font-size:20px;
	`}
	cursor: pointer;
	&:active {
        opacity: 0.4;
		/* background: ${({ theme }) => theme.purpleLight}; */
	}
`;
