import React, { useEffect } from 'react';
import { ErrorContainer, ErrorItem } from './style';
import { ErrorText } from 'common/selectors';

interface IError {
	errors: string[];
}

const Error: React.SFC<IError> = ({ errors }) => {
	const parseErrors = aErros =>
		aErros.map((sError, i) => {
			return (
				<ErrorItem key={`${sError}_${i}`}>
					<ErrorText>{sError}</ErrorText>
				</ErrorItem>
			);
		});

	return <ErrorContainer>{parseErrors(errors)}</ErrorContainer>;
};

export default Error;
