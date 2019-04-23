import React, { useEffect, Component } from 'react';
import Template from 'src/components/pageTemplate/template';

const IndexPage = () => {
	return (
		<Template step={1} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
			<Ledger />
		</Template>
	);
};

interface IHompage {
	props: {
		store: {
			errors: string[];
		};
		actions: object[];
	};
}

class Ledger extends Component {
	constructor(props) {
		super(props);
	}
	componentWillUnmount() {
		console.log('cleanning');
		this.props.actions.setTemplateErrors([]);
	}
	render() {
		return 'asdsadasdasd';
	}
}
export default IndexPage;
