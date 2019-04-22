import React, { useEffect } from 'react';
import { ErrorContainer, ErrorItem } from './style';
import { H6 } from 'common/selectors';

interface IError {
	errors: string[];
}

const Error: React.SFC<IError> = ({ errors }) => {
	const parseErrors = aErros =>
		aErros.map((sError, i) => {
			return (
				<ErrorItem key={`${sError}_${i}`}>
					<H6>{sError}</H6>
				</ErrorItem>
			);
		});

	return <ErrorContainer>{parseErrors(errors)}</ErrorContainer>;
};

export default Error;
