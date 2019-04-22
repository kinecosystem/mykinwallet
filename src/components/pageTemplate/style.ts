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
	justify-self:flex-end;
	margin-top:30px;
	${media.sm`
			width:433px;
			justify-self:flex-end;
		`}
		${media.md`
			justify-self:flex-start;
			width:464px;
			margin-top:50px;
		`}
		${media.lg`
			width:612px;
		`}
		${media.xl`
			margin-top:0;
			justify-self:center;
			width:600px;
	`}


`;

export const SideContainer_content = styled.div`
	margin:30px 17px;
	height:100%;
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
	${grid('2em', 'flex-start', 'initial', 'auto auto', 'auto')}
	position:relative;
	bottom:0;
	margin-top:38px;
	${media.sm`
		margin-top:184px;
	`}
	${media.md`
		margin-top:67px;
	`}
	${media.lg`
		margin-top:71px;
	`}
	${media.xl`
		margin-top:75px;
	`}
`;
