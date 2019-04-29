import React, { ReactNode, Component } from 'react';
import { ThemeProvider } from 'styled-components';
import SEO from './seo';
import KinTheme from '../style/theme';
import Header from './header';
import Footer from './footer';
import './layout.css';
import { Grid } from 'common/grid';

interface IProps {
	children: ReactNode;
	background?: string;
	acceptCookie: Function;
	accepted: boolean;
	arrowColor?: string;
}

interface IS {
	isOnTop: boolean;
}

class Layout extends Component<IProps, IS> {
	state: IS = {
		isOnTop: true
	};

	componentDidMount() {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', this.handleScroll);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		if (window.scrollY > 120 && this.state.isOnTop) {
			this.setState({ isOnTop: false });
		} else if (window.scrollY < 120 && !this.state.isOnTop) {
			this.setState({ isOnTop: true });
		}
	};

	render() {
		const { background, children } = this.props;

		return (
			<ThemeProvider theme={KinTheme}>
				<>
						<SEO title="Kin Esystem" keywords={['kin', 'application', 'react']} />
						<Header background={background} isOnTop={this.state.isOnTop} />
						<Grid>
							<div className="container">{children}</div>
						</Grid>
						<Footer />
				</>
			</ThemeProvider>
		);
	}
}

export default Layout;
