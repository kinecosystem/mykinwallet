import React, { useState, useEffect } from 'react';
import Alerts from 'src/components/messages/error';
import { MessageHeadAText } from 'src/components/messages/info';

const ErrorsTemplate = error => {
	switch (error) {
		case 'could not connect to ledger device':
			return {
				head: 'Please make sure youre device is connected.',
				text: 'Connect your Ledger device, unlock it and open the Kin application.'
			};
		default:
			return { head: error, text: '' };
	}
};

const ErrorsTemplateRed = error => {
	switch (error) {
		case 'Error: invalid encoded string':
			return 'Private key is not valid';
		case 'Error: invalid version byte. expected 144, got 48':
			return 'Private key is not valid';
		case 'Error: invalid checksum':
			return 'Private key is not valid';
		default:
			return error;
	}
};

const Messages = ({ path, errors }) => {
	const [errorsInfo, setErrorsInfo] = useState([]);
	const [errorsAlerts, setErrorsAlerts] = useState([]);
	useEffect(() => {
		manipulateErrors();
		manipulateErrorsRed();
	}, [errors]);

	const manipulateErrors = () => {
		setErrorsInfo(
			errors.map((sError, i) => {
				return ErrorsTemplate(sError);
			})
		);
	};

	const manipulateErrorsRed = () => {
		setErrorsAlerts(
			errors.map((sError, i) => {
				return ErrorsTemplateRed(sError);
			})
		);
	};

	return <>{path === '/' ? <MessageHeadAText errors={errorsInfo} /> : <Alerts errors={errorsAlerts} />}</>;
};

export default Messages;
