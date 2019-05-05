import React, { useEffect } from 'react';
import { MessageBox, ErrorContainer, ErrorText } from './style';

interface IError {
	errors: string[];
}

const Error: React.SFC<IError> = ({ errors }) => {
	const parseErrors = aErros =>
		aErros.map((sError, i) => {
			console.log(aErros);
			return (
				<MessageBox type="error" key={`${sError}_${i}`}>
					<ErrorText>{sError}</ErrorText>
				</MessageBox>
			);
		});
	/** active means if errors is displayed make add margin */
	return <ErrorContainer active={!!errors.length}>{parseErrors(errors)}</ErrorContainer>;
};

export default Error;
