import React from 'react';
import { MessageBox, MessageBoxTextOnly } from './style';
import { SmallTitle, P } from 'common/selectors';
import { T_14_16_lg } from '../../style/common/selectors';
import { blackish } from '../../style/theme/generalVariables';

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
						<T_14_16_lg family="SailecBold" color={blackish}>
							{head}
						</T_14_16_lg>
					</SmallTitle>
					<SmallTitle>
						<T_14_16_lg family="SailecBold" color={blackish}>
							{text}
						</T_14_16_lg>
					</SmallTitle>
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
