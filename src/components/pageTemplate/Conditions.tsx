import React from 'react';
import { Conditions } from './style';
import { Link } from 'gatsby';
import { A } from 'common/selectors';
import TermsModal from 'src/components/modals/terms/Terms';

const ConditionsComponent = ({ hide }) => (
	<Conditions hide={hide}>
		<TermsModal
			button={
				<div className="terms">
					<A>Terms and Conditions</A>
				</div>
			}
		/>

		<div className="conditions">
			<Link to="costumer-support">
				<A>Customer Support</A>
			</Link>
		</div>
	</Conditions>
);

export default ConditionsComponent;
