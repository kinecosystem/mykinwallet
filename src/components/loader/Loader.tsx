import React from 'react';
import { LoaderStyle } from './style';

const Loader = ({loading}) => {
	return <LoaderStyle visible={loading} />;
};

export default Loader;
