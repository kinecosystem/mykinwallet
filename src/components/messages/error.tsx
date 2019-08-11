import React, { useEffect } from 'react';
import { MessageBox, ErrorContainer, ErrorText } from './style';
import { T_14_16_lg } from '../../style/common/selectors';
import { volcanoRed } from 'src/style/theme/generalVariables';

interface IError {
	errors: string[];
}

const Error: React.SFC<IError> = ({ errors }) => {
	const parseErrors = aErros =>
		aErros.map((sError, i) => {
			return (
				<MessageBox type="error" key={`${sError}_${i}`}>
					<ErrorText>
						<T_14_16_lg color={volcanoRed}>{sError} </T_14_16_lg>
					</ErrorText>
				</MessageBox>
			);
		});
	/** active means if errors is displayed make add margin */
	return <ErrorContainer active={!!errors.length}>{parseErrors(errors)}</ErrorContainer>;
};

export default Error;
