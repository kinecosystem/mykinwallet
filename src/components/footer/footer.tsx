import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import { getIcon } from '../svg';
import * as Styled from './styles';
import { Grid } from 'common/grid';
//@ts-ignore
import Logo from '../../images/logo/LOGO_FOOTER.svg';

const strings = {
	footerTitle: 'Kin',
	topLinks: [{ name: 'About us', url: '/about' }, { name: 'Contact us', url: 'mailto:info@kinecosystem.com', isHref: true }],
	bottomLinks: [
		{ name: 'Kin apps', url: '/kin-apps/' },
		{
			name: 'Developers',
			url: '/developers'
		},
		{ name: 'Stats', url: '/stats', hideInBreakpoint: true },
		{
			name: 'Block explorer',
			url: '/blockchainExplorer',
			hideInBreakpoint: true
		},
		{
			name: 'Kin Migration',
			url: '/migration',
			hideInBreakpoint: true
		}
	],
	footerSecondTitle: 'Discover',
	footerTitleModified: 'Subscribe to our newsletter',
	footerLeftBottom: [
		{
			name: 'Privacy policy',
			url: '/privacy-policy.pdf',
			isHref: true,
			isNewTab: true
		},
		{
			name: 'Terms and conditions',
			url: '/terms-and-conditions.pdf',
			isHref: true,
			isNewTab: true
		}
	],
	footerCopyrightTitle: `© ${new Date().getFullYear()} Kin Foundation`
};

interface ILinks {
	name: string;
	url: string;
	isHref?: boolean;
	hideInBreakpoint?: boolean;
	isNewTab?: boolean;
}

const Footer: React.SFC = () => {
	enum FormState {
		default = '',
		sending = 'sending',
		success = 'success',
		failure = 'failure'
	}

	const [formState, setFormState] = useState(FormState.default);
	const [email, setEmail] = useState('');

	const links = (items: ILinks[]): React.ReactNode => {
		return items.map((link, idx) => {
			const LinkElement = link.hideInBreakpoint ? Styled.disappearingFooterLinks : Styled.footerTitleLinks;
			return (
				<div key={idx}>
					{link.isHref ? (
						<Styled.link href={link.url} target="_blank">
							<LinkElement>{link.name}</LinkElement>
						</Styled.link>
					) : (
						<Link to={link.url}>
							<LinkElement>{link.name}</LinkElement>
						</Link>
					)}
				</div>
			);
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(FormState.sending);

		const url = 'https://app.sendx.io/api/v1/form/5t7uKhXcEhkAB2XH15DoV7';
		// TODO: fix the cors issue
		const cors = 'https://cors-anywhere.herokuapp.com/';

		fetch(url, {
			method: 'POST',
			body: JSON.stringify(email)
		}).then((result: Response) => {
			setFormState(result.ok ? FormState.success : FormState.failure);
			if (result.ok) {
				setEmail('Got it, thanks!');
				setFormState(FormState.success);
			} else {
				setFormState(FormState.failure);
			}
		});
	};

	return (
		<Styled.mainContainer>
      <Grid>

			<Styled.footerTop>
				<Styled.iconBox onClick={() => navigate('/')}>
					<Styled.footerLogo src={Logo} alt={'Icon'} />
				</Styled.iconBox>

				<Styled.linksContainer>
					<Styled.divContainer>
						<Styled.footerTitle>{strings.footerTitle}</Styled.footerTitle>
						<Styled.footerLeftLinks>{links(strings.topLinks)}</Styled.footerLeftLinks>
					</Styled.divContainer>

					<Styled.divContainer>
						<Styled.footerTitle>{strings.footerSecondTitle}</Styled.footerTitle>
						<Styled.footerLeftLinks>{links(strings.bottomLinks)}</Styled.footerLeftLinks>
					</Styled.divContainer>
				</Styled.linksContainer>

				<Styled.subscribe>
					<Styled.footerTitleModified>{strings.footerTitleModified}</Styled.footerTitleModified>

					<form onSubmit={handleSubmit} className={formState}>
						<Styled.mailInput
							onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setEmail(value)}
							value={email}
							name="Email"
							placeholder={formState !== FormState.success ? 'Your email' : 'Got it, thanks!'}
							disabled={formState === FormState.success ? true : false}
						/>
					</form>
					<Styled.arrow onClick={handleSubmit}>{getIcon('Subscribe')}</Styled.arrow>
				</Styled.subscribe>
				<Styled.iconsContainer>
					<Styled.footerIcons>
						<a href="https://www.linkedin.com/company/kin-ecosystem" target="_blank">
							{getIcon('linkedin')}
						</a>
						<a href="https://reddit.com/r/kinfoundation" target="_blank">
							{getIcon('reddit')}
						</a>
						<a href="https://medium.com/kinblog" target="_blank">
							{getIcon('medium')}
						</a>
					</Styled.footerIcons>
				</Styled.iconsContainer>
			</Styled.footerTop>
			<Styled.footerLeftBottomWrapper>
				<Styled.footerLeftBottom>{links(strings.footerLeftBottom)}</Styled.footerLeftBottom>
				<Styled.footerTitleCopyright>{strings.footerCopyrightTitle}</Styled.footerTitleCopyright>
			</Styled.footerLeftBottomWrapper>
      </Grid>
		</Styled.mainContainer>
	);
};

export default Footer;
