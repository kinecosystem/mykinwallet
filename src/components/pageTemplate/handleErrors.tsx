import React, { useState, useEffect } from 'react';
import Alerts from 'src/components/messages/error';
import { MessageHeadAText } from 'src/components/messages/info';
import { ErrorStyle } from './style';
import { Br_lg,Br_xl } from 'common/selectors';

const ErrorsTemplate = error => {
	switch (error) {
		case 'Failed to sign with Ledger device: U2F TIMEOUT':
			return {
				head: `Failed to sign with your Ledger device. Session timeout.`,
				text: (
					<ErrorStyle>
						Connect your Ledger device, unlock it <Br_lg/> <Br_xl/> and open the Kin application.
					</ErrorStyle>
				)
			};
		case 'Failed to sign with Ledger device: U2F DEVICE_INELIGIBLE':
			return {
				head: `Failed to sign with Ledger device:`,
				text: <ErrorStyle>The attached device is not a valid Ledger device.</ErrorStyle>
			};
		case 'No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.':
			return {
				head:'No WebUSB interface found.',
				text: (
					<ErrorStyle>
						Connect your Ledger device, unlock it <Br_lg/> <Br_xl/> and open the Kin (SPL) application.
					</ErrorStyle>
				),
			}
		case 'Ledger device: UNKNOWN_ERROR (0x6804)':
		case 'Ledger device: INS_NOT_SUPPORTED (0x6d00)':
			return {
				head: 'Ledger device error.',
				text: (
					<ErrorStyle>
						Please ensure your device is unlocked and the Kin (SPL) application is open.
					</ErrorStyle>
				),
			}
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
			return 'Destination account not valid.';
		case 'Error: Request failed with status code 404':
			return 'Destination account does not exist.';
		case "TypeError: Cannot read property 'toString' of undefined":
			return 'Destination account not valid or empty.';
		case 'Failed to sign with Ledger device: U2F TIMEOUT':
			return 'Failed to sign with your Ledger device. Session timeout.';
		case 'Error: Network Error':
			return 'It seems that you are experiencing network issues. Please try again at a later time.';
		case 'Resource Missing':
			return 'Account is missing or does not exist.';
		case 'Ledger device: UNKNOWN_ERROR (0x6804)':
			return 'Failed to sign with your Ledger device. Session timeout.';
		case 'Failed to sign with Ledger device: U2F DEVICE_INELIGIBLE':
			return 'Failed to sign with your Ledger device. Session timeout.';
		case 'TransportStatusError: Ledger device: UNKNOWN_ERROR (0x6808)':
			return 'Failed to sign with your Ledger device. Please ensure the "Allow blind sign" setting in the Kin (SPL) app is set to "Yes".';
		default:
			return error;
	}
};

const Messages = ({ path, errors, show }) => {
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

	return <>{path === '/' ? show && <MessageHeadAText errors={errorsInfo} /> : <Alerts errors={errorsAlerts} />}</>;
};

export default Messages;
