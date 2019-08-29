import media from 'common/breakpoints';
import { grid } from 'common/mixin';
import styled from 'styled-components';
import { purple } from '../../style/theme/generalVariables';

export const Structure_container = styled.div`
	${grid('0', 'initial', 'initial', 'auto', 'auto')}
	${media.md`
		${grid('0em', 'initial', 'initial', '238px auto', 'auto')}
	`}
	${media.lg`
		${grid('0em', 'initial', 'initial', '312px auto', 'auto')}
	`}
	${media.xl`
		${grid('0em', 'initial', 'initial', 'auto auto', 'auto')}
	`}
`;

export const SideContainer = styled.div`
	position: relative;
	background: white;
	width: 100%;
	justify-self: flex-end;
	margin-top: 30px;
	min-height: 942px;

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
	margin:30px 12px;
	height:100%;
	padding-bottom: 66px;
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
		margin:60px 72px;
	`}
`;
//FOOTER\\
export const Footer = styled.div`
	width: 100%;
	position: absolute;
	font-size: 12px;
	left: 0;
	line-height: 21px;
	${grid('2em', 'space-between', 'initial', 'repeat(2, auto)', 'auto')}
	${media.lg`
	font-size: 12px;
	line-height:23px;
	${grid('2em', 'space-between', 'initial', 'repeat(2, auto)', 'auto')}
	`}
	bottom:40px;
	width: 95%;
	left:5%;
	${media.sm`
		width: 85%;
		left:7.5%;
	
	`}
	${media.md`
		width: 79%;
		left:10.5%;
	`}
	${media.lg`
	
		width: 72%;
		left:13.5%;
	`}
	${media.xl`
	
		width: 75%;
		left:12.5%;
	`}
	${({ hide }) => hide === 'signOut' && `display:none !important;`}
	.logOut {
		font-size:16px;
		cursor:pointer;
		text-decoration:underline;
		color:${purple};
	}
	.cSupp {
		${({ hide }) => hide === 'conditions' && 'display:none'}
	}
`;

export const FooterItem = styled.div`
	${({ hide }) => hide && 'display:none'}
`;

export const Support = styled.section`
	${grid('2em', 'flex-start', 'initial', 'repeat(2, auto)', 'auto')}
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
	/* font-size: 15px;
	${media.lg`
			display:none
			font-size:20px;
		`} */
`;
