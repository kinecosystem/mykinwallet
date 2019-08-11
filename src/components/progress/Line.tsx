import React from 'react';
import { Line } from 'rc-progress';
import { purple } from 'style/theme/generalVariables';
import { Step, ProgressLineContainer } from './style';

const ProgressLine = ({ step, outOf }) => (
	<ProgressLineContainer>
		<Step>
			STEP {step}/{outOf}
		</Step>
		<Line percent={step * (100 / outOf)} strokeColor={purple} />
	</ProgressLineContainer>
);

export default ProgressLine;
