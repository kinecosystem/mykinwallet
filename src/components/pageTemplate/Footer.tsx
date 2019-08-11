import React from 'react';
import { Footer, Support } from './style';
import { Link } from 'gatsby';
import { A } from 'common/selectors';

const FooterComponent = ({ hide, path, store, resetAll }) => (
	<Footer hide={hide}>
		{store.blockchain.publicKey && <div className='logOut' onClick={()=>resetAll()}>Sign out</div>}
		<Support>
			<div className="cSupp">
				<a href="mailto:migration-support@kin.org" target="_top">
					<A>Customer Support</A>
				</a>
			</div>
			<div>
				<Link to="/privacy-policy" state={{ lastPage: path }}>
					<A>Privacy policy</A>
				</Link>
			</div>
		</Support>
	</Footer>
);

export default FooterComponent;
