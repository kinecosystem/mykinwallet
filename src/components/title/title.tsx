import React from 'react';
import { TitleContainer } from './style';
import { H1, H6 } from 'common/selectors';

const Title = ({ main, sub }) => (
	<TitleContainer>
		<div>
			<H1>{main}</H1>
			<H6>{sub}</H6>
		</div>
	</TitleContainer>
);
export default Title;
