import React from 'react';
import { LoaderStyle } from './style';

const Loader = ({ loading }) => {
	return (
		<LoaderStyle visible={loading}>
			<div className="loader-5">
				<span />
			</div>
		</LoaderStyle>
	);
};

export default Loader;
