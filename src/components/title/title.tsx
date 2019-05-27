import React from 'react';
import { TitleContainer } from './style';
import { H1, H6 } from 'common/selectors';
import { Link } from 'gatsby';

const Title = ({ main, sub, handleClick }) => (
	<TitleContainer>
		<Link to="/" onClick={handleClick}>
			<div>
				<H1>{main}</H1>
				<H6>{sub}</H6>
			</div>
		</Link>
	</TitleContainer>
);
export default Title;
