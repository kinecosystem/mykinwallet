import styled from 'styled-components';
import media from 'common/breakpoints';

export const TermsStyle = styled.div`

header {
    margin: 62px 0 30px 0;
    ${media.lg`
        margin: 81px 0 33px 0;
    `}
}
section {
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
`;
