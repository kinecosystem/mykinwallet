import styled from 'styled-components';
import media from 'common/breakpoints';
import { flexRow } from 'common/mixin';

export const TermsStyle = styled.div`

header {

    margin: 62px 0 30px 0;
    ${media.lg`
        margin: 81px 0 33px 0;
    `}
}
section {
    padding-bottom: 150px ;
    ${media.sm`
            max-width:523px;
        `}
    ${media.md`
            max-width:583px;
        `}
        ${media.lg`
            max-width:992px;
        `}
        ${media.xl`
            max-width:702px;
        `}
    p {
        color: ${({ theme }) => theme.blackish};
        font-size: 14px;
        line-height: 25px;
        ${media.lg`
        font-size: 16px;
        letter-spacing: 0.4px;
        line-height: 27px;
        `}
        span {
            font-family: SailecBold;
        }
    }
    ol {
        li{

        }
        &.roman {
            list-style-type: lower-roman
        }
    }
    ul.decimal {
        list-style-type: decimal;
    }
    ul.alphabetic {
        list-style-type: lower-alpha;
    }


}
`;

export const H3 = styled.header`
	font-family: SailecBold;
    margin: 0;
        font-size: 22px;
        line-height: 31px;
	${media.md`
        font-size: 24px;
        line-height: 28px;
    `}
    color: ${({ theme }) => theme.blackish};
`;

export const TermsContainerStyle = styled.div`
	position: absolute;
	width: 100%;
	background: white;
`;

export const ModalStyled = styled.div``;

export const ModalStyledX = styled.div`
	cursor: pointer;
	img {
		width: 29px;
		height: 29px;
		${media.sm`
            width: 23px;
		    height: 23px;
        `}
		${media.md`
            width: 30px;
		    height: 30px;
        `}
	}
`;
export const ModalHeader = styled.header`
	${flexRow('space-between', 'center')}
`;
export const ModalHeaderContainer = styled.div`
	position: sticky;
	top: 0;
	z-index: 2;
	background: white;
`;

export const FloatingApprove = styled.div`
	position: sticky;
	z-index: 5;
	width: 100%;
    top:calc(100% - 66px) ;
	background: ${({ theme }) => theme.purple};
    ${flexRow('center', 'center')}
    color:white;
    cursor: pointer;
	height: 66px;
    ${({ theme }) => theme.h3.mobile}

    ${media.md`
        top:calc(100% - 84px) ;
	    height: 84px;
    `}
   
    ${media.xl`
    ${({ theme }) => theme.h3.desktop}
    `}
`;
