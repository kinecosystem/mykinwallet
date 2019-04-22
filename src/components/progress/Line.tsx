import React from 'react';
import { Line } from 'rc-progress';
import { purple } from 'style/theme/generalVariables';
import { Step, ProgressLineContainer } from './style';

const ProgressLine = ({ step }) => (
	<ProgressLineContainer>
		<Step>STEP {step}/6</Step>
		<Line percent={step * 16.6} strokeColor={purple} />
	</ProgressLineContainer>
);

export default ProgressLine;
