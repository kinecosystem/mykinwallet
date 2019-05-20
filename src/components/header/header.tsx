import React, { useState, useRef, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Link, navigate } from 'gatsby';
import * as Styled from './styles';
import { MenuButton } from './hamburgerMenuButton';
import { MobileMenu } from './mobileMenu';
//@ts-ignore
import LogoTop from '../../images/logo/LOGO_HEADER.svg';
//@ts-ignore
import LogoScroll from '../../images/logo/LOGO_KIN.svg';
import { Grid } from 'common/grid';

interface IProps {
	siteTitle?: string;
	background?: string;
	isOnTop: boolean;
}

interface IMouseEvent extends MouseEvent {
	path?: Node[];
}

const headerLinks = [
	{ name: 'Kin', url: '/', type: 'logo' },
	// { name: 'Kin Migration', url: 'https://www.kin.org/migration', type: 'link' },
	// { name: 'Kin Apps', url: 'https://www.kin.org/kin-apps/', type: 'link' },
	// { name: 'Developers', url: 'https://www.kin.org/developers', type: 'link' }
	// { name: 'Block explorer', url: 'https://www.kin.org/blockchainExplorer', type: 'link' }
];

const Header = ({ background, isOnTop }: IProps) => {
	const [isOpen, setMenuMode] = useState(false);
	const menu: React.RefObject<{}> = useRef(null);
	const hamburgerBtn: React.RefObject<{}> = useRef(null);

	const handleClick = ({ path }: IMouseEvent) => {
		const btnClicked = path.find(node => node === hamburgerBtn.current);

		if (!btnClicked) {
			setMenuMode(false);
			enableBodyScroll(menu);
			window.removeEventListener('click', handleClick);
		}
	};

	useEffect(() => {
		return () => {
			clearAllBodyScrollLocks();
			window.removeEventListener('click', handleClick);
		};
	}, []);

	const toggleMenu = () => {
		if (!isOpen) {
			window.addEventListener('click', handleClick);
			disableBodyScroll(menu);
		} else {
			window.removeEventListener('click', handleClick);
			enableBodyScroll(menu);
		}
		setMenuMode(!isOpen);
	};

	return (
		<Styled.header background={background ? background : false} isOnTop={isOnTop}>
			<Grid>
				<Styled.headerContainer>
					<Styled.headerIcon onClick={() => (window.location = 'https://www.kin.org/')}>
						<Styled.icon src={isOnTop ? LogoTop : LogoScroll} alt={'Icon'} />
						<Styled.logoText isOnTop={isOnTop}>{headerLinks.find(link => link.type === 'logo').name}</Styled.logoText>
					</Styled.headerIcon>

					<Styled.headerNev>
						{headerLinks
							.filter(link => link.type === 'link')
							.map(item => (
								<Styled.link href={item.url} key={item.name}>
									<Styled.nevLink isOnTop={isOnTop}>{item.name}</Styled.nevLink>
								</Styled.link>
							))}
					</Styled.headerNev>

					<MenuButton ref={hamburgerBtn} isOnTop={isOnTop} isOpen={isOpen} toggleMenu={toggleMenu} />
				</Styled.headerContainer>
				<MobileMenu links={headerLinks} isOpen={isOpen} ref={menu} />
			</Grid>
		</Styled.header>
	);
};

export default Header;
