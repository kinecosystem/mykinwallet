import React from 'react';
import Template from 'src/components/pageTemplate/template';
import { Context } from 'src/components/PageTemplate/context';
const IndexPage = props => {
	return (
		<Template step={1} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
			<Context.Consumer>
				{(context)=>{
					console.log(context)
				}}
			</Context.Consumer>
		</Template>
	);
};

export default IndexPage;
