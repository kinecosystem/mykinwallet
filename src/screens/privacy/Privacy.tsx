import React, { useRef, useEffect } from 'react';
import { Grid } from 'common/grid';
import { PrivacyStyle, TermsContainerStyle, ModalHeaderContainer, FloatingApprove } from './style';
import { H3 } from 'common/selectors';
import { ThemeProvider } from 'styled-components';
import KinTheme from 'src/style/theme';
import LogoGreen from 'src/images/logo/LOGO_GREEN.svg';
import blackClose from 'src/images/x_button.svg';
import { ModalStyledX, ModalHeader } from './style';
import { navigate } from 'gatsby';

const Privacy = ({ location }) => {
	const headerRef = useRef(null);
	useEffect(() => {
		document.addEventListener('scroll', () => {
			if (headerRef.current !== null && headerRef.current) {
				const { y } = headerRef.current.getBoundingClientRect();
				if (y === 0) headerRef.current.setAttribute('style', 'box-shadow:0 2px 2px -2px rgba(146, 146, 146, 0.5)');
				else headerRef.current.setAttribute('style', 'box-shadow:none');
			}
		});
		return () => document.removeEventListener('scroll', () => '');
	}, []);
	return (
		<ThemeProvider theme={KinTheme}>
			<TermsContainerStyle>
				<FloatingApprove />
				<ModalHeaderContainer ref={headerRef}>
					<Grid>
						<ModalHeader>
							<div>
								<img src={LogoGreen} alt="modal_icon" /> Kin
							</div>
							<ModalStyledX
								onClick={() => {
									if (location.state && location.state !== null) navigate(`/${location.state.lastPage}`);
									else navigate(`/`);
								}}
							>
								<img src={blackClose} alt="X" />
							</ModalStyledX>
						</ModalHeader>
					</Grid>
				</ModalHeaderContainer>
				<Grid>
					<PrivacyStyle>
						<H3>MY KIN WALLET PRIVACY POLICY</H3>
						<section>
							<p>
								<span>Last Updated: May 5, 2019</span>
							</p>
							<p>
								This is the privacy policy (the “Policy”) that governs how we, Kin Foundation (&quot;Foundation&quot;, “we”, “our”
								or &quot;us&quot;), use Personal Data (defined below) that we collect, receive and store about individuals in
								connection with My Kin Wallet Service (the “Service”). We respect your privacy and are committed to protecting it
								through our compliance with this policy.
							</p>
							<ol>
								<li>
									This policy describes the types of information we collect from you or that you may provide when you use the
									“Service” and our practices for collecting, using, maintaining, protecting, and disclosing that information and
									the choices you can make about the way your Personal Data is collected and used in connection with the Service.
									“Personal Data” means any information that may be used, either alone or in combination with other information,
									to personally identify an individual, including, but not limited to, a first and last name, a personal profile,
									an email address, a home or other physical address, or other contact information.
								</li>
								<li>
									The Service is designed to provide user-friendly functionality that allows users to transfer their ‘Kin’
									(“Kin”), a cryptocurrency stewarded by the Kin Foundation. We value privacy and we make a concerted effort to
									minimize and, to the extent possible, eliminate the exposure of Personal Data during the use of our interface.
									We do not collect data passively, do not monetize the collection of data, and do not use your data for marketing
									or advertising.
								</li>
								<li>
									This Policy applies to anyone who accesses the Services. Please read the Policy carefully to understand our
									practices regarding your information and how we will treat it. By using the Service, you acknowledge that the
									collection, use, and sharing of your information will take place as described in this Policy.
								</li>
								<li>
									<b>THE BLOCKCHAIN.</b> Due to the inherent transparency of many blockchains, including the Kin Blockchain (a
									fork of the Stellar Blockchain), transactions that individuals broadcast via the Service may be publicly
									accessible. This includes, but is not limited to, your public sending address, the public address of the
									receiver, the amount sent or received, and any other data a user has chosen to include in a given transaction
									(Memo data). Information stored on a blockchain may be public, immutable, and difficult or even impossible to
									remove or delete. Transactions and addresses may reveal information about the user’s identity and information
									can potentially be correlated now or in the future by any party who chooses to do so, including law enforcement.
									Users are encouraged to review how privacy and transparency on the blockchain works.
								</li>
								<li>
									<b>WHAT WE COLLECT, HOW WE COLLECT IT, WHY WE COLLECT IT AND HOW IT IS USED.</b> We receive and/or collect
									Personal Data from you as described below. We use this information to enhance your experience with our Services
									and as otherwise described below.
								</li>
								<ul className="no-list-style-2">
									<li>
										<div>
											<div>5.1.</div>{' '}
											<div>
												When You Login and Submit a Transfer Request: In order to use the Service, you will be required to provide
												us with certain information to allow us to authenticate your wallet and to complete the requested transfer
												of Kin. This information includes your public wallet address, the destination wallet address, the Kin
												amount you desire to transfer, the memo text (optional) and, if relevant to the type of wallet selected,
												the private key associated with your public wallet address. We will not retain any Personal Data; however,
												the transaction will appear on the Blockchain (as outlined above).
												<ul>
													<li>
														We collect and use this Personal Data for the following purposes: (i) to allow you to use the Service;
														(ii) to perform/execute the Service terms and conditions available at:
														https://mykinwallet.org/terms-and-conditions ; (iii) to contact you in connection with the Service;
														(iv) to identify and authenticate your access to the Service and (v) to produce data that is not
														identified as relating to you (such data, the “Aggregated Data”). We may use, process, store, disclose
														and transmit the Aggregated Data to create, use and share general statistics relating to the use of
														the Service.
													</li>
													<li>
														Legal Basis for Processing (GDPR only):
														<ul>
															<li>
																Performance of a contract to which the data subject is party or in order to take steps at the
																request of the data subject prior to entering into a contract (This means we need the information
																to perform our contract with you): When you use the Service, we use this information to ascertain
																eligibility and use of the Service.
															</li>
															<li>
																Legitimate interest (This means we have a legitimate interest that does not outweigh your privacy
																rights. When we collect and process information based on our legitimate interests, we consider how
																we can accomplish what we need to in a way that is the least obtrusive on your privacy): To
																facilitate your access to and use of the Service.
															</li>
														</ul>
													</li>
												</ul>
											</div>
										</div>
									</li>
									<li>
										<div>
											<div>5.2.</div>
											<div>
												<u>
													<b>When You Submit a ‘Contact Us’ Request.</b>
												</u>{' '}
												If you contact us by sending us an email to an email address that we display, you will be required to
												provide us with your name and email address, if relevant to you inquiry, we will also collect and, if
												relevant to the inquiry, information about how you access and use the Service.
												<ul>
													<li>
														We collect and use this Personal Data for the following purposes: (i) to process and answer questions;
														(ii) to provide support (e.g., to solve problems and/or other issues); and (iii) to customize your
														experience.
													</li>
													<li>
														Legal Basis for Processing (GDPR only):
														<ul>
															<li>
																<b>
																	Performance of a contract to which the data subject is party or in order to take steps at the
																	request of the data subject prior to entering into a contract:
																</b>
																When you contact us regarding the support or administration of the Service, or with any other
																LEGAL_1:54645129.4 inquiry regarding the Service, we use this information to respond to your
																inquiry and provide you with support with respect to the Service.
															</li>
															<li>
																<b>Legitimate Interest:</b>
																We use this information to respond to your inquiries and provide you with information that you
																request.
															</li>
														</ul>
													</li>
												</ul>
											</div>
										</div>
									</li>
								</ul>
								<li>
									<b>THE WAY WE SHARE PERSONAL DATA.</b>
									<ul className="no-list-style">
										<li>
											<div>6.1.</div>
											<div>
												We transfer your Personal Data to our local or foreign affiliated companies for the purpose of storing or
												processing such information on our behalf. We ensure transfers within the Kin group will be covered by an
												agreement entered into by members of the Kin group which contractually obliges each member to ensure that
												Personal Data receives an adequate and consistent level of protection wherever it is transferred to.
											</div>
										</li>
										<li>
											<div>6.2.</div>
											<div>
												We may share your Personal Data with our third party service providers and partners, but only to assist us
												with our business operations and/or the administration of the Service. We will obtain contractual
												commitments or other assurances from them to protect your Personal Data. Some of these assurances are well
												recognized certification schemes like the EU - US Privacy Shield for the protection of Personal Data
												transferred from within the EU to the United States.
											</div>
										</li>
										<li>
											<div>6.3.</div>
											<div>
												Our local and foreign affiliates and third party service providers may be located in the United States,
												Canada, and Israel, or other countries. Because of this, your Personal Data may be available to the United
												States, Canadian, Israeli or other governments or their agencies under a lawful order made in that
												country.
											</div>
										</li>
										<li>
											<div>6.4.</div>
											<div>
												We may disclose your Personal Data if we have a good faith belief that disclosure of such information is
												helpful or reasonably necessary to: (i) comply with any applicable law, regulation, legal process or
												governmental request, and requests of law enforcement, regulatory and other governmental agencies or if
												required to do so by court order, including in order to detect, prevent, or otherwise address fraud or
												security issues; or protect against harm to the rights, property or safety of Kin, our users, yourself or
												the public.
											</div>
										</li>
										<li>
											<div>6.5.</div>
											<div>
												If, in the future, we sell or transfer some or all of our business or assets to a third party, we will (to
												the minimum extent required) disclose information to a potential or actual third party purchaser of our
												business or assets. In the event that we are acquired by or merged with a third party entity, or in the
												event of bankruptcy or a comparable event, we reserve the right to transfer or assign Personal Data in
												connection with the foregoing events.
											</div>
										</li>
										<li>
											<div>6.6.</div>
											<div>
												Where you have provided your consent to us sharing the Personal Data (e.g., where you provide us with
												marketing consents or opt-in to optional additional services or functionality).
											</div>
										</li>
										<li>
											<div>6.7.</div>
											<div>
												Access to Personal Data of EU residents from Israel is covered by the European Commission’s Adequacy
												Decision regarding Israel. You can read more here:
												<a href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en">
													{' '}
													https://ec.europa.eu/info/law/law-topic/data-protection/data-transfers-
													outside-eu/adequacy-protection-personal-data-non-eu-countries_en.
												</a>
											</div>
										</li>
									</ul>
								</li>
								<li>
									<b>CHOICE.</b>
									At all times, you may choose whether or not to provide or disclose Personal Data.
								</li>
								<li>
									<b>ACCESS/ACCURACY.</b> To the extent that you do provide us with Personal Data, we wish to maintain accurate
									Personal Data. If you would like to delete or correct any of your Personal Data that we may be storing, you may
									submit an access request by sending an email to: <a href="mailto:privacy@kin.org">privacy@kin.org</a> Your email
									should include adequate details of your request (for example: the name of the team or organization).
								</li>
								<li>
									<b>CHILDREN’S PRIVACY.</b> The Service is not structured to attract children under the age of 16 years.
									Accordingly, we do not intend to collect Personal Data from anyone we know to be under 16 years. If we learn
									that we have collected Personal Data from a child under 16 years, we will delete that information as quickly as
									possible. If you believe that we might have any such information, please contact us at:{' '}
									<a href="mailto:privacy@kin.org">privacy@kin.org</a>.
								</li>
								<li>
									<b>SECURITY.</b> The security of Personal Data is important to us. We follow generally accepted industry
									standards, including the use of appropriate administrative, physical and technical safeguards, to protect the
									Personal Data submitted to us. However, no method of transmission over the Internet, or method of electronic
									storage, is 100% secure. Therefore, while we strive to use reasonable acceptable means to protect your Personal
									Data, we cannot guarantee its absolute security or confidentiality. If you have any questions about security of
									the Service, you can contact us at: <a href="mailto:privacy@kin.org">privacy@kin.org</a>.
								</li>
								<li>
									<b>MERGER, SALE OR BANKRUPTCY.</b> In the event that we are acquired by or merged with a third party entity, or
									in the event of bankruptcy or a comparable event, or otherwise involved in a chance of control, we reserve the
									right to transfer or assign Personal Data in connection with the foregoing events.
								</li>
								<li>
									<b>DELETION OF CONTENT FROM CALIFORNIA RESIDENTS.</b> If you are a California resident under the age of 18 and a
									registered user, California Business and Professions Code Section 22581 permits you to remove content or
									Personal Data you have publicly posted. If you wish to remove such content or Personal Data and you specify
									which content or Personal Data you wish to be removed, we will do so in accordance with applicable law. To make
									such a request, please send an email to <a href="mailto:privacy@kin.org">privacy@kin.org</a> Please be aware
									that after removal you will not be able to restore removed content. In addition, LEGAL_1:54645129.4 such removal
									does not ensure complete or comprehensive removal of the content or Personal Data you have posted and that there
									may be circumstances in which the law does not require us to enable removal of content.
								</li>
								<li>
									<b>CALIFORNIA DO NOT TRACK DISCLOSURES.</b> We do not track users over time and across third party websites to
									provide targeted advertising and therefore does not respond to Do Not Track (DNT) signals.
								</li>
								<li>
									<b>LEGAL OBLIGATION.</b> We may need to use, store or otherwise process your Personal Data to comply with a law
									enforcement preservation request, subpoena, or other legal process or to protect the rights of other users.
								</li>
								<li>
									<b>EU PARTICIPANTS’ RIGHTS.</b> In addition to other rights detailed in the policy (such as requesting deletion,
									correction or updating of your personal data), EU citizens have certain rights regarding Your Personal Data,
									including:
									<ul className="no-list-style">
										<li>
											<div>15.1.</div>
											<div>
												<u>
													<b>Right to Object or Restrict Processing.</b>
												</u>{' '}
												You have the right to object to or restrict our use of your Personal Data for direct marketing purposes or
												under certain circumstances when the legal bases for using your information is based upon our legitimate
												interest. If you wish to object to our use of your information, you can send a request to delete this
												information by <a href="mailto:privacy@kin.org">clicking here.</a>
											</div>
										</li>
										<li>
											<div>15.2.</div>
											<div>
												<u>
													<b>Right to Erasure.</b>
												</u>{' '}
												You have the right to have your personal data erased and no longer processed. You can send us a request to
												delete your application by<a href='mailto:privacy@kin.org'> clicking here.</a> Upon receiving the request, we will make a reasonable effort to
												delete your Personal Data from our internal network within a reasonable period of time as long as we are
												not obligated to preserve your information due to things like law enforcement preservation requests,
												subpoenas, investigations, litigation, or otherwise meet any of our other legal obligations. We may also
												retain depersonalized information after deletion.
											</div>
										</li>
										<li>
											<div>15.3.</div>
											<div>
												<u>
													<b>Data Portability.</b>
												</u>{' '}
												You can exercise your right to export your personal data by <a href="mailto:privacy@kin.org">clicking here.</a>
											</div>
										</li>
										<li>
											<div>15.4.</div>
											<div>
												<u>
													<b>File a Complaint.</b>
												</u>{' '}
												You have the right to complain to the data protection authority located in your Member State. To find
												contact details, <a target='__blank' href="https://ec.europa.eu/newsroom/article29/news-overview.cfm">clicking here.</a>
											</div>
										</li>
										<li>
											<div>15.5.</div>
											<div>
												<u>
													<b>Right to Object to Profiling.</b>
												</u>{' '}
												You have the right to object to profiling.
											</div>
										</li>
										<li>
											<div>15.6.</div>
											<div>
												<u>
													<b>The Right to Withdraw Consent.</b>
												</u>{' '}
												The right to withdraw your consent. Please note that there may be circumstances in which we are entitled
												to continue processing your data, in particular if the processing is required to meet our legal and
												regulatory obligation. Withdrawing your consent will not apply to any processing conducted in reliance on
												lawful processing bases other than consent.
											</div>
										</li>
										<li>
											<div>15.7.</div>
											<div>
												<u>
													<b>The Right to Request Details of The Basis of Data Transfers Outside of the EEA. </b>
												</u>{' '}
												You also have a right to request details of the basis on which your Personal Data is transferred outside
												the European Economic Area, but you acknowledge that data transfer agreements may need to be partially
												redacted for reasons of commercial confidentiality.
											</div>
										</li>
									</ul>
								</li>
								<li>
									<b>COMMITMENT.</b> We are committed to protecting your privacy. Protecting your privacy online is an evolving
									area, and we are constantly evolving our Service to meet these demands. If you have any comments or questions
									regarding our Privacy Policy, or your Personal Data that we may be storing and using, please contact us at
									privacy@kin.org
								</li>
								<li>
									<b>LINKS TO OTHER SITES.</b> The Services contain links to other third-party websites or applications. Once you
									click on such a link and leave the Site or are redirected to a third- party website or application, you are no
									longer governed by this Policy. Any information you provide on those sites is subject to that third party’s
									privacy policy and we are not responsible for the privacy and security practices and policies of those
									third-party sites or applications.
								</li>
								<li>
									<b>RETENTION.</b>
									We will retain the information you provide in order to process your request, provide support, and/or carry out
									and fulfill our Promotions. If you request support, we will retain your information for no longer than six (6)
									months. If you participate in a Promotion, we will retain your information until the Promotion is carried out
									and ninety (90) days after any prize, reward, or offer is fulfilled. Your personal data will then be deleted.
								</li>
								<li>
									CONTACT INFORMATION. We welcome your comments or questions about this Policy. <br />
									You may contact us at: <br />
									Kin Foundation <br />
									Attention: Privacy Office <br />
									c/o 137 Glasgow Street, Suite 525 <br />
									Kitchener, ON N2G 4X8 <br />
									<a href="mailto:privacy@kin.org">privacy@kin.org</a>
								</li>
								<li>
									<b>CHANGES TO PRIVACY POLICY.</b> Be sure to check back often for the latest information on our privacy
									practices. When we update this Privacy Policy, we will change the “Last Updated” date above. In addition, we may
									notify you of changes to this Privacy Policy by email.
								</li>
							</ol>
						</section>
					</PrivacyStyle>
				</Grid>
			</TermsContainerStyle>
		</ThemeProvider>
	);
};

export default Privacy;
