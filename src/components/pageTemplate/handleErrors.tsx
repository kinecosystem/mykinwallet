import React, { useState, useEffect } from 'react';
import Alerts from 'src/components/messages/error';
import { MessageHeadAText } from 'src/components/messages/info';

const ErrorsTemplate = error => {
	switch (error) {
		case 'Ledger device: UNKNOWN_ERROR (0x6804)':
			return {
				head: 'Please make sure youre device is connected.',
				text: <span> Connect your Ledger device, unlock it <br/> and open the Kin application.</span>
			};
		case 'Failed to sign with Ledger device: U2F TIMEOUT':
			return {
				head: 'Failed to sign with Ledger device.',
				text: <span> Connect your Ledger device, unlock it <br/> and open the Kin application.</span>
			};
		default:
			return { head: error, text: '' };
	}
};

const ErrorsTemplateRed = error => {
	switch (error) {
		case 'Error: invalid encoded string':
			return 'Validation failed. Please check that you entered the right address.';
		case 'Error: invalid version byte. expected 144, got 48':
			return 'Validation failed. Please check that you entered the right address.';
		case 'Error: invalid checksum':
			return 'Validation failed. Please check that you entered the right address.';
		case 'Error: Request failed with status code 400':
			return 'Destination account not valid';
		case 'Error: Request failed with status code 404':
			return 'Destination account does not exist';
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
