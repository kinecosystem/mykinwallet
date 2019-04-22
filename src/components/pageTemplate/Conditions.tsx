import React from 'react';
import { Conditions } from './style';
import { Link } from 'gatsby';
import { A } from 'common/selectors';

const ConditionsComponent = () => (
	<Conditions>
		<Link to="terms">
			<A>Terms and Conditions</A>
		</Link>
		<Link to="costumer-support">
			<A>Customer Support</A>
		</Link>
	</Conditions>
);

export default ConditionsComponent;
