import React, { useEffect } from 'react';
import Template from 'src/components/pageTemplate/template';
import { Context } from 'src/components/PageTemplate/context';
const IndexPage = () => {
	return (
		<Template step={1} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
			<Homepage />
		</Template>
	);
};

const Homepage = props => {
	useEffect(() => {
		const { actions, store } = props;
		!store.errors.length && actions.setTemplateErrors(['asdasdasdas','asdasd', 'asdda']);
	});
	return 'asdasd';
};
export default IndexPage;
