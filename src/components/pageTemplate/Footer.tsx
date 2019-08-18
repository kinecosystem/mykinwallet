import React from 'react';
import { Footer, Support, FooterItem } from './style';
import { Link, navigate } from 'gatsby';
import { A } from 'common/selectors';

const hidePrivacyAt = ['/transaction', '/transaction-approved','/review-payment','/approve-payment'];
const hidecostumerSupAt = ['/transaction-approved'];

const FooterComponent = ({ hide, path, store, resetAll }) => (
	<Footer hide={hide}>
		{store.blockchain.publicKey && (
			<div className="logOut" onClick={() => {
				resetAll()
				navigate('/')
				}}>
				Sign out
			</div>
		)}
		{console.log(path)}
		<Support>
			<FooterItem className="cSupp">
				<a href="mailto:migration-support@kin.org" target="_top">
					<A>Customer Support</A>
				</a>
			</FooterItem>
			<FooterItem hide={hidePrivacyAt.includes(path)}>
				<Link to="/privacy-policy" state={{ lastPage: path }}>
					<A>Privacy policy</A>
				</Link>
			</FooterItem>
		</Support>
	</Footer>
);

export default FooterComponent;
