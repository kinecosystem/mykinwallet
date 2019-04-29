import styled from 'styled-components';
import media from 'common/breakpoints';
import { flexColumn } from 'common/mixin';

export const CheckboxStyle = styled.div`
	.ant-checkbox {
		&:hover {
			.ant-checkbox-inner {
				border-color: ${({ theme }) => theme.purple};
			}
		}
		&-checked {
			.ant-checkbox-inner {
				background: ${({ theme }) => theme.purple};
				border-color: ${({ theme }) => theme.purple};
			}
			&::after {
				border-color: ${({ theme }) => theme.purple};
			}
		}
		.ant-checkbox-inner {
			width: 19px;
			height: 19px;
			&:after {
				height: 16px;
				width: 5.35px;
				left: 10%;
				top: 7px;
			}
		}
		.ant-checkbox-input:focus + .ant-checkbox-inner {
			border-color: ${({ theme }) => theme.purple};
		}
	}
	.text-styleing {
		color: ${({ theme }) => theme.blackish};
		${({ theme }) => theme.smallText.mobile}
		${media.lg`
            ${({ theme }) => theme.smallText.desktop}
        `};
	}
`;

export const SelectStyle = styled.div`
	width: 100%;
	.ant-select {
		width: 100%;
		&-selection {
			height: 42px;
			border-radius: 2px;
			border-color: ${({ theme }) => theme.blackish};
			&:hover {
				border-color: ${({ theme }) => theme.purple};
			}
			${flexColumn('center')}
			&-selected-value {
				color: ${({ theme }) => theme.blackish};
			}
		}
		.ant-select-arrow {
			img {
				width: 16px;
				height: 10px;
			}
		}
	}
`;

export const InputStyle = styled.div`
	.ant-input {
		border-color: ${({ theme }) => theme.blackish};
		border-radius: 2px;
		font-size: 14px;
		height: 42px;
		letter-spacing: 0.42px;
		${media.md`
            font-size:16px;
        `}
		&::placeholder {
			color: #a6a6a6;
		}
	}
`;
