import media from 'common/breakpoints';
import { grid, flexRow } from 'common/mixin';
import styled, { keyframes } from 'styled-components';
import { start } from 'repl';

export const LedgerStyle = styled.section``;
export const LedgerHeader = styled.div`
	margin-bottom: 30px;
`;
export const PurpleTitle = styled.div`
	font-size: 17px;
	span {
		font-family: SailecBold;
	}
	margin-bottom: 24px;
	color: ${({ theme }) => theme.purple};
	${media.lg`
	    font-size: 19px;
    `}
`;

export const CheckboxContainer = styled.div`
	margin-top: 43px;
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
	}
`;
export const CheckboxAlert = styled.div`
	display: ${({ hide }) => (hide ? 'none' : 'block')};
`;

export const ButtonContainer = styled.div`
	margin-top: 23px;

}
`;

{
	/** Derivation path Component */
}

export const DerivationStyle = styled.div`
	background: ${({ theme }) => theme.purpleTransedB};
	padding: 24px;
	min-height: 267px;

	> header > header {
		font-size: 17px;
		${media.lg`
        font-size: 19px;
        margin-bottom:12px;
    `}
	}
`;

export const AddressContainer = styled.div`
	margin-top: 30px;
	margin-bottom: 25px;
	color: ${({ theme }) => theme.purple};
	font-size: 12px;
	${grid('12px', 'initial', 'initial', 'auto', 'auto')}
	span {
		font-family: SailecMedium;
	}
	.base {
		${flexRow()}
		div {
			margin-left: 2em;
		}
	}
	.initial {
		div {
			display: none;
		}
	}
	.selected {
		div {
			font-family: SailecMedium;
			display: unset;
		}
	}
`;

export const CopyAddress = styled.div`
	color: ${({ theme }) => theme.purple};
	font-size: 14px;
	cursor: pointer;
	text-decoration: underline;
`;
