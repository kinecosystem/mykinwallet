import media from 'common/breakpoints';
import { grid } from 'common/mixin';
import styled from 'styled-components';

export const Structure_container = styled.div`
	${grid('0', 'initial', 'initial', 'auto', 'auto')}
	${media.md`
		${grid('0em', 'initial', 'initial', '222px auto', 'auto')}
	`}
	${media.lg`
		${grid('0em', 'initial', 'initial', '222px auto', 'auto')}
	`}
	${media.xl`
		${grid('0em', 'initial', 'initial', 'auto auto', 'auto')}
	`}
`;

export const SideContainer = styled.div`
	background: white;
	width: 100%;
	justify-self: flex-end;
	margin-top: 30px;
	min-height: 942px;
	position: relative;

	${media.sm`
		width:433px;
		justify-self:flex-end;
		min-height:660px;
		`};
	${media.md`
		justify-self:flex-start;
		width:464px;
		margin-top:50px;
		min-height:774px;
		`};
	${media.lg`
		width:612px;
		min-height:828px;
	`};
	${media.xl`
		margin-top:0;
		justify-self:center;
		width:600px;
	`};
`;

export const SideContainer_content = styled.div`
	margin:30px 17px;
	height:100%;
	/* padding-bottom: 66px; */
	${media.sm`
		margin:30px 27px;
	`}
	${media.md`

		margin:42px;
	`}
	${media.lg`

		margin:48px 78px;
	`}
	${media.xl`
		margin:66px 72px;
	`}
`;

export const Conditions = styled.div`
	width: 100%;
	position: absolute;
	bottom: 66px;
	font-size: 11px;
	line-height: 21px;
	${grid('2em', 'flex-start', 'initial', 'repeat(3, auto)', 'auto')}

	${media.md`
		font-size: 12px;
		line-height:23px;
		${grid('2em', 'flex-start', 'initial', 'repeat(3, auto)', 'auto')}
	`}


	.terms {
		cursor: pointer;
		${({ hide }) => hide === 'terms' && 'display:none'}
	}
	.conditions {
		${({ hide }) => hide === 'conditions' && 'display:none'}
	}
`;

export const Github = styled.div`
	color: white;
	text-decoration: underline;
	font-size: 17px;
	line-height: 28px;
	margin-top: 60px;
	${media.sm`
		margin-top:54px;
	`}
	${media.md`
		margin-top:-17px;
	`}
`;

export const ErrorStyle = styled.div`
	br {
		${media.md`
			display:none
		`}
	}
`;
