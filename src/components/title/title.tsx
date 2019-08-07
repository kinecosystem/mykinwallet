import React from 'react';
import { TitleContainer } from './style';
import { H1, H6 } from 'common/selectors';
import { Link } from 'gatsby';
import { T_14_16_lg } from '../../style/common/selectors';

const HandleSub = ({ sList }) => {
	return sList.map((str, i) => <T_14_16_lg key={`${str}_${i}`}>{str}</T_14_16_lg>);
};
const Title = ({ main, sub, handleClick }) => {
	return (
		<TitleContainer>
			<div>
				<Link to="/" onClick={handleClick}>
					<H1>{main}</H1>
				</Link>
				<HandleSub sList={sub} />
			</div>
		</TitleContainer>
	);
};
export default Title;
