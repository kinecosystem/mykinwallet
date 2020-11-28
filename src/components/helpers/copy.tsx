import React from 'react';
import { message } from 'antd';
import copy from 'copy-to-clipboard';
import { FloatingMessage } from '../antd';

function handleCopy(address) {
	copy(address);
	message.open({
		content: <FloatingMessage icon={'copy'}>Address was copied to your clipboard.</FloatingMessage>
	});
}

export default handleCopy;
