import React from 'react';
import Privacy from 'src/screens/privacy/Privacy';
import { ThemeProvider } from 'styled-components';
import KinTheme from '../style/theme';

const Provided = () => (
	<ThemeProvider theme={KinTheme}>
		<Privacy />
	</ThemeProvider>
);

export default Provided;
