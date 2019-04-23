import React, { useEffect } from 'react';
import { ErrorContainer, ErrorText } from './style';
import { MessageBox } from './style';
import { SmallTitle } from 'common/selectors';

interface IMessage {
	props: {
		head: string;
		text: string;
	};
}

const Message: React.SFC<IMessage> = ({ head, text }) => {
	return (
		<MessageBox>
			<SmallTitle bold>{head}</SmallTitle>
			<SmallTitle>{text}</SmallTitle>
		</MessageBox>
	);
};

export default Message;
