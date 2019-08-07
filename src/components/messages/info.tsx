import React, { useEffect } from 'react';
import { ErrorContainer, ErrorText } from './style';
import { MessageBox, MessageBoxTextOnly } from './style';
import { SmallTitle, P } from 'common/selectors';
import { T_14_16_lg } from '../../style/common/selectors';

interface IMessage {
	errors: [];
	text: string;
}

export const MessageHeadAText: React.SFC<IMessage> = ({ errors }) => {
	const parseErrors = aMessages =>
		aMessages.map(({ head, text }, i) => {
			return (
				<MessageBox infoBox={true} key={`${i}_head`}>
					<SmallTitle bold={!!text}>
						{head}
					</SmallTitle>
					<SmallTitle>{text}</SmallTitle>
				</MessageBox>
			);
		});
	return <>{parseErrors(errors)}</>;
};

export const MessageText: React.SFC<IMessage> = ({ text }) => {
	return (
		<MessageBoxTextOnly>
			<P>{text}</P>
		</MessageBoxTextOnly>
	);
};
