import React from 'react';
import { Conditions } from './style';
import { Link } from 'gatsby';
import { A } from 'common/selectors';

const ConditionsComponent = ({ hide, path }) => (
	<Conditions hide={hide}>
		<div className="conditions">
			<a href="mailto:migration-support@kin.org" target="_top">
				<A>Customer Support</A>
			</a>
		</div>

		{/* <div>
			<Link to="/terms-and-conditions" state={{ lastPage: path }}>
				<A>Terms and Conditions</A>
			</Link>
		</div> */}

		<div>
			<Link to="/privacy-policy" state={{ lastPage: path }}>
				<A>Privacy policy</A>
			</Link>
		</div>
	</Conditions>
);

export default ConditionsComponent;
