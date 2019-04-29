import React, { useEffect } from 'react';
import { ErrorContainer, ErrorText } from './style';
import { MessageBox, MessageBoxTextOnly } from './style';
import { SmallTitle, P } from 'common/selectors';

interface IMessage {
	head: string;
	text: string;
}

export const MessageHeadAText: React.SFC<IMessage> = ({ head, text }) => {
	return (
		<MessageBox>
			<SmallTitle bold>{head}</SmallTitle>
			<SmallTitle>{text}</SmallTitle>
		</MessageBox>
	);
};

export const MessageText: React.SFC<IMessage> = ({ text }) => {
	return (
		<MessageBoxTextOnly>
			<P>{text}</P>
		</MessageBoxTextOnly>
	);
};
