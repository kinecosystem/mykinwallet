import styled from 'styled-components';
import media from 'common/breakpoints';
import { flexRow, grid } from 'common/mixin';

export const KeyAccessContainer = styled.section``;
export const TitleContainer = styled.div`
	margin-bottom: 30px;
`;

export const Form = styled.form`
	margin-top: 20px;
	${grid('0px', 'initial', 'flex-start', 'auto', 'auto')}
`;

export const ButtonContainer = styled.div`
	margin-top: 25px;
`;
export const CheckboxContainer = styled.div`
	margin-top: 34px;

	${flexRow()};

	label {
		${flexRow('flex-start', 'center')}
	}
	label span {
		${grid('5px', 'flex-start', 'initital', 'auto auto', 'auto')}
	}
	div {
		color: ${({ theme }) => theme.purple};
	}
	.terms {
		position: relative;
		left: -15px;
		font-size: 12px;
		line-height: 23px;
		cursor: pointer;
		color: ${({ theme }) => theme.purple};
	}
`;

/** Related Modal  */

export const RelatedModalStyle = styled.div`
	header {
		margin: 62px 0 30px 0;
		${media.lg`
			margin: 81px 0 33px 0;
		`}
	}
	p {
		color: ${({ theme }) => theme.blackish};
		font-size: 14px;
		line-height: 25px;
		${media.lg`
			font-size: 16px;
			line-height: 27px;
		`}
		span {
			font-family: SailecBold;
		}
	}
`;

export const CheckboxAlert = styled.div`
	display: ${({ hide }) => (hide ? 'none' : 'block')};
	color: ${({ theme }) => theme.volcanoRed};
`;
