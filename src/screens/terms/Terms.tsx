import React, { useEffect, useRef } from 'react';
import { Grid } from 'common/grid';
import { TermsStyle, TermsContainerStyle } from './style';
import { H3 } from 'common/selectors';
import { ThemeProvider } from 'styled-components';
import KinTheme from 'src/style/theme';
import LogoGreen from 'src/images/logo/LOGO_GREEN.svg';
import blackClose from 'src/images/x_button.svg';
import { ModalStyledX, ModalHeader, FloatingApprove, ModalHeaderContainer } from './style';
import { navigate } from 'gatsby';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setTerms } from 'src/store/actions/site/actions.ts';

const Terms = ({ actions, location }) => {
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
				<FloatingApprove
					onClick={() => {
						actions.setTerms();
						navigate('/transaction', { state: { type: location.state.lastPage } });
					}}
				>
					{' '}
					Accept and continue
				</FloatingApprove>
				<ModalHeaderContainer ref={headerRef}>
					<Grid>
						<ModalHeader>
							<div>
								<img src={LogoGreen} alt="modal_icon" /> Kin Ecosystem
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
					<TermsStyle>
						<H3>MY KIN WALLET TERMS OF USE</H3>
						<section>
							<p>
								<span>Last Updated: May 6, 2019</span>
							</p>
							<p>
								<span>Welcome to My Kin Wallet Service!</span>
							</p>
							<p>
								The following My Kin Wallet Terms of Use (the “Terms”) govern your access to and use of the My Kin Wallet Service
								(the “Service”). The Service is designed to provide user-friendly functionality that allows users to transfer
								their ‘Kin’ (“Kin”), a cryptocurrency stewarded by the Kin Foundation (“Kin Foundation”, “us”, “we”, “our”). These
								Terms form an agreement between the Kin Foundation and you. The term “you” refers to the person or entity
								accessing or otherwise using the Service (“use” or “using” in these Terms will mean either of the foregoing).
							</p>
							<p>
								BY USING THE SERVICE, YOU REPRESENT THAT YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY THESE TERMS, AS
								UPDATED FROM TIME TO TIME IN ACCORDANCE WITH SECTION 3 . IF YOU DO NOT AGREE WITH THESE TERMS, PLEASE DO NOT USE
								THESE SERVICES. IF YOU ARE USING THE SERVICE ON BEHALF OF ANOTHER PERSON OR ENTITY, YOU REPRESENT AND WARRANT THAT
								YOU HAVE THE AUTHORITY TO BIND SUCH PERSON OR ENTITY TO THESE TERMS.
							</p>
							<p>
								WE WANTED TO LET YOU KNOW THAT THESE TERMS INCLUDE AN ARBITRATION AGREEMENT WHICH WILL, WITH LIMITED EXCEPTIONS,
								REQUIRE DISPUTES BETWEEN US REGARDING THESE TERMS OR THE SERVICE TO BE SUBMITTED TO BINDING AND FINAL ARBITRATION.
								UNLESS YOU OPT OUT OF THE ARBITRATION AGREEMENT: (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AND SEEK RELIEF
								AGAINST US ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR
								PROCEEDING; AND (2) YOU ARE WAIVING YOUR RIGHT TO SEEK RELIEF IN A COURT OF LAW AND TO HAVE A JURY TRIAL ON YOUR
								CLAIMS. PLEASE READ SECTION 12b) CAREFULLY.
							</p>
							<p>
								WE ALSO WANTED TO LET YOU KNOW THAT ONE OF THE TRANSFER METHODS MADE AVAILABLE BY THE SERVICE ALLOWS YOU TO ENTER
								YOUR PRIVATE KEY(S) TO TRANSFER YOUR KIN. YOU ACKNOWLEDGE AND AGREE THAT YOUR PRIVATE KEY IS HIGHLY SENSITIVE,
								THAT THIS FUNCTIONALITY SHOULD ONLY BE USED BY EXPERIENCED CRYPTO USERS, AND THAT WE DO NOT GUARANTEE THAT PRIVATE
								KEY(S) THAT ARE ENTERED INTO THE SERVICE WILL REMAIN PRIVATE.
							</p>
							<p>
								This Agreement does not alter in any way the terms or conditions of any other agreement you may have with us in
								respect of any products, services or otherwise.
							</p>
							<ol>
								<li>Who Can Use the Service?</li>
								<p>
									The Service is not intended for use by anyone under the age of 16. If you are not yet legally considered an
									adult where you live (known as the age of majority), you may only use the Service if your parent or guardian
									agrees to these Terms on your behalf.
								</p>
								<li>Your Rights to Use the Services</li>
								<p>
									Subject to these Terms and your compliance with them and any other policies we make available to you from time
									to time, you may access and use the Service.
								</p>
								<p>
									You may not sell, rent, lease, assign, distribute, copy, modify or host any part of the Service. As well, you
									may not adapt, merge, make adaptations, translations or derivative works of, disassemble, decompile, reverse
									compile, attempt to discover the source code or reverse engineer any part of the Service, except to the extent
									these restrictions are expressly prohibited by applicable law or to the extent permitted by a separate written
									agreement that we agree to with you.
								</p>
								<p>
									You may not access or use the Service in any manner or for any purpose that infringes, misappropriates or
									otherwise violates any intellectual property right or other right of any third party, or that violates any
									applicable law.
								</p>
								<li>Changes to these Terms</li>
								<p>
									Except where prohibited by applicable law, we reserve the right to change these Terms at any time without
									notice. You acknowledge and agree that we may update this Terms at any time by posting an updated version
									located at: https://mykinwallet.org/terms-and-conditions. Your continued access to or use of the Service after
									any changes to these Terms indicates your acceptance of such changes. It is your responsibility to check for
									updates from time to time.
								</p>
								<li>The Service is not a Wallet</li>
								<p>
									The Service is not a &quot;wallet&quot; or a “web wallet”. By using the Service, you do not create an account or
									give us your Kin or funds to hold onto.
								</p>
								<p>
									The Service is intended to make it easy for you to transfer Kin from your public address to another public
									address.
								</p>
								<p>
									The Service allows you to transfer Kin in multiple ways. One such way (the “Key Pair/Paper wallet”) allows you
									to enter your private key which corresponds to your public address and is associated with the Kin being
									transferred.
								</p>
								<p>
									WE DO NOT RECOMMEND THAT YOU USE THE KEY PAIR/PAPER WALLET METHOD. YOUR PRIVATE KEY IS HIGHLY SENSITIVE AND THE
									KEY PAIR/PAPER WALLET METHOD SHOULD ONLY BE USED BY EXPERIENCED CRYPTO USERS. WITHOUT LIMITING THE GENERALITY OF
									THE GENERAL DISCLAIMER IN SECTION 9 , THE KEY LEGAL_1:54645128.5 PAIR/PAPER WALLET METHOD IS PROVIDED “AS IS”
									AND “AS AVAILABLE”, WITH ALL FAULTS AND WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND. TO THE FULLEST EXTENT
									PERMITTED BY APPLICABLE LAW, WE DISCLAIM ANY WARRANTIES, REPRESENTATIONS OR COVENANTS THAT YOUR PRIVATE KEY WILL
									REMAIN PRIVATE BY USING THE KEY PAIR/PAPER WALLET METHOD.
								</p>
								<p>We highly recommend that you be proactive about keeping your Kin secure. Some tips are:</p>
								<ol>
									<li>Don&#39;t share how much Kin you own with anyone.</li>
									<li>Don’t use exchange wallets any longer than you need.</li>
									<li>Encrypt your wallet(s).</li>
									<li>Use separate addresses where possible.</li>
									<li>Always double check everything.</li>
									<li>Make backups of your keys.</li>
									<li>Never spend money you can&#39;t afford to lose.</li>
								</ol>
								<p>
									You acknowledge that Kin transactions performed using the Service, including each time you transfer Kin, are
									irreversible and that it is your sole responsibility to ensure you make each decision to spend or transfer Kin
									carefully.
								</p>
								<p>
									We are not responsible for any loss. The Service is under active development. While we have tested our Service,
									there is always the possibility something unexpected happens that causes your Kin to be lost. Please be careful
									when using the Service.
								</p>
								<p>
									You agree that: (a) you are using Kin at your own risk, on an as-is and where-is basis; (b) you will abide by
									any policies made available by us in respect of the Service; (c) we and our affiliates are not representing or
									warranting that Kin has any monetary value; and (d) we and our affiliates are not responsible for anything
									operated by third parties.
								</p>
								<li>Software</li>
								<p>
									As part of the Services, we may make a software version of the Service available to you (the “Software”) for
									download that will enable you to use the Service in “offline” mode. The Software includes all source code,
									binaries, and documentation made available for download in connection with the Service.
								</p>
								<p>
									Subject to these Terms and your compliance with them and any other policies we make available to you from time
									to time, we grant you a worldwide, non-exclusive, non-transferrable, non-sublicensable and revocable license
									(the “License”) to download, install and use the Software. The License will terminate when these Terms are
									terminated or if we suspend or stop providing the Service. Upon termination of the License, you will stop using,
									uninstall and delete the Software.
								</p>
								<p>
									These Terms will apply, as applicable, to your downloading, installation and use of the Software. All references
									to the “Service” in these Terms will be deemed to include the Software, as applicable. If, with respect to the
									Software, there is a conflict or inconsistency between this Section 5 and the other Sections in these Terms,
									then the provisions of this Section 5 will govern to the extent of such conflict or inconsistency.
								</p>
								<p>
									Notwithstanding the foregoing in this Section 5 , the License and other restrictions on use of the Software in
									these Terms will not apply to any part of the Software that is in source code format and that we make available
									with an accompanying license covering such source code. For such source code in the Software, such other
									accompanying license will apply to your use thereof.
								</p>
								<li>Privacy</li>
								<p>
									Our privacy policy, which contains important information about our practices in collecting, storing, using and
									disclosing information about identifiable individuals (“Personal Information”), can be found here:
									https://mykinwallet.org/privacy-policy (“Privacy Policy”). You acknowledge that you have read and understand our
									Privacy Policy, and agree that we may collect, store, use and disclose Personal Information made available by
									you in accordance with our Privacy Policy.
								</p>
								<li>Ownership</li>
								<p>
									We, or our affiliates and licensors as applicable, retain all ownership and intellectual property rights in and
									to: (a) the Services; and (b) all modifications, improvements, customizations, updates, enhancements, derivative
									works, translations and adaptations to the foregoing.
								</p>
								<li>Modifying the Services and Termination</li>
								<p>
									We are always improving our Services and creating new ones. We may add or remove features, products or
									functionality, and we may also suspend or stop the Services at any time without notice. We can also terminate
									these Terms and suspend or prohibit you from using the Service if we think you have violated these Terms or for
									any reason.
								</p>
								<p>
									We will not be liable to you for terminating these Terms. No matter who ends these Terms, you and we will
									continue to be bound by Sections 4 (The Service is not a Wallet), 6 (Privacy), 7 (Ownership), 8 (Modifying the
									Services and Termination), 10 (Indemnity), 9 (Disclaimers), 11 (Limitation of Liability), and 12 (General
									Provisions).
								</p>
								<li>Disclaimers</li>
								<p>
									THE LAWS OF CERTAIN JURISDICTIONS, INCLUDING QUEBEC, DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LEGAL
									WARRANTIES, CONDITIONS OR LEGAL_1:54645128.5 REPRESENTATIONS. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE
									EXCLUSIONS OR LIMITATIONS IN THIS SDK LICENSE (INCLUDING THE FOLLOWING DISCLAIMERS) MAY NOT APPLY AND YOU MAY
									HAVE ADDITIONAL RIGHTS.
								</p>
								<p>
									YOU ACKNOWLEDGE, UNDERSTAND, AND AGREE THAT THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE”, WITH ALL FAULTS
									AND WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM
									ALL WARRANTIES, REPRESENTATIONS AND CONDITIONS OF ANY KIND WITH RESPECT TO THE SERVICE WHETHER EXPRESS, IMPLIED,
									STATUTORY OR COLLATERAL, INCLUDING, WITHOUT LIMITATION, THE WARRANTIES AND CONDITIONS OF MERCHANTABILITY,
									MERCHANTABLE QUALITY, COMPATIBILITY, TITLE, SECURITY, RELIABILITY, COMPLETENESS, QUIET ENJOYMENT, ACCURACY,
									RELIABILITY, CURRENCY, TIMELINESS, QUALITY, INTEGRATION, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT,
									OR ANY WARRANTIES OR CONDITIONS ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE, OR THAT THE SERVICE IS OR
									WILL BE ERROR-FREE OR WILL OPERATE WITHOUT INTERRUPTION.
								</p>
								<li>Indemnification</li>
								<p>
									You will defend, indemnify and hold harmless us, our affiliates and all of our respective officers, directors,
									employees, representatives and agents from and against any claims, causes of action, demands, recoveries,
									losses, damages, fines, penalties, or other costs or expenses of any kind or nature including reasonable legal
									and accounting fees arising out of or in connection with: (a) your use of the Service in violation of any
									applicable law or the rights of a third party; or (b) your use of the Service contrary to these Terms or other
									policies made available by us to you.
								</p>
								<li>Limitation of Liability</li>
								<p>
									TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL WE BE LIABLE, WHETHER BASED ON WARRANTY,
									CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR ANY OTHER LEGAL THEORY, FOR ANY DAMAGES OF ANY KIND (INCLUDING,
									WITHOUT LIMITATION, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY OR PUNITIVE DAMAGES, LOST
									PROFITS, LOSS OF USE, LOSS OF DATA, PERSONAL INJURY, FINES, FEES, PENALTIES OR OTHER LIABILITIES), WHETHER OR
									NOT WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, RESULTING FROM OR RELATED TO THE SERVICES.
								</p>
								<li>General Provisions</li>
								<ul className="alphabetic">
									<li>
										<u>Choice of Law.</u> Except as restricted by applicable law, these Terms will be governed by the laws of the
										Province of Ontario and the federal laws of Canada applicable therein and such laws apply to your access to or
										use of the Service, notwithstanding your domicile, residency or physical location. You will only use the
										Services in jurisdictions where the Services may lawfully LEGAL_1:54645128.5 be used. Except as restricted by
										applicable law, you hereby consent to the exclusive jurisdiction and venue of courts in Toronto, Ontario,
										Canada in all disputes arising out of or relating to the use of the Service.
									</li>
									<li>
										<u>Arbitration.</u> Except as restricted by applicable law:
									</li>
									<ol className="roman">
										<li>
											Except as described in Sections 12b)ii , 12b)iii and 12b)viii , any dispute or claim between you and us
											relating to or arising out of these Terms will be referred to and determined exclusively through binding
											confidential arbitration conducted in Toronto, Ontario, Canada, unless you are a resident of the United
											States, in which case the arbitration will be held in a location within 100 miles of your residence, unless
											the parties agree otherwise. The arbitration will be held on an individual basis, before a single arbitrator
											and in accordance with the applicable Ontario arbitration statute (the Arbitration Act, 1991, S.O. 1991,
											c.17, as amended, or the International Commercial Arbitration Act, R.S.O. 1990, c. I.9, as amended, or such
											other statute that may be enacted). The arbitration will not be open to the public or media and all evidence
											discovered or submitted is confidential and may not be publicly disclosed, except as needed to enforce an
											arbitral award.
										</li>
										<li>
											Any claims or disputes where the total amount of the award sought is less than Ten Thousand U.S. Dollars (US
											$10,000.00) may be resolved through binding non-appearance- based arbitration, at the option of the party
											seeking relief. For claims or disputes where the total amount of the award sought is Ten Thousand U.S.
											Dollars (US $10,000.00) or more, the right to a hearing will be determined by the arbitration rules.
										</li>
										<li>
											You and Kin Foundation may also take claims to small claims court in Toronto, Ontario, Canada if the dispute
											qualifies for hearing by that court.
										</li>
										<li>
											BY YOUR USE OF THE SERVICES, YOU ARE GIVING UP YOUR RIGHT TO GO TO COURT TO ASSERT ANY CLAIMS, EXCEPT FOR
											MATTERS THAT MAY BE TAKEN TO SMALL CLAIMS COURT.
										</li>
										<li>
											You and Kin Foundation also agree that: (A) you and the Kin Foundation will each pay such portion of the
											costs of the arbitration (which consists of each party’s legal expenses, the fees and expenses of the
											arbitrator, and any other expenses related to the arbitration) as determined by the arbitrator; (B) the
											arbitrator may, in making an award of costs, consider whether costs are prohibitive compared to litigating
											in a court, and may require Kin Foundation to pay a greater portion of the fees and expenses of the
											arbitrator, or the travel expenses of you or any witness, in which case Kin Foundation will pay as much of
											your arbitration costs as the arbitrator deems necessary to prevent such cost-prohibitiveness; (C) the
											arbitrator will honor claims of privilege and privacy recognized at law; (D) the arbitrator may award any
											individual relief or individual remedies that are permitted by applicable law; and (E) the arbitrator’s
											award will be final and non-appealable, but may be enforced in any court of competent jurisdiction.
										</li>
										<li>
											YOU AND KIN FOUNDATION HEREBY WAIVE YOUR CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A TRIAL
											IN FRONT OF A JUDGE OR A JURY, INSTEAD ELECTING THAT ALL CLAIMS AND DISPUTES WILL BE RESOLVED BY ARBITRATION
											UNDER THESE TERMS. ARBITRATION PROCEDURES ARE TYPICALLY MORE LIMITED, MORE EFFICIENT AND LESS COSTLY THAN
											RULES APPLICABLE IN COURT AND ARE SUBJECT TO VERY LIMITED REVIEW BY A COURT. IN THE EVENT ANY LITIGATION
											SHOULD ARISE BETWEEN YOU AND KIN FOUNDATION IN ANY STATE OR FEDERAL COURT IN A SUIT TO VACATE OR ENFORCE AN
											ARBITRATION AWARD OR OTHERWISE, YOU AND KIN FOUNDATION WAIVE ALL RIGHTS TO A JURY TRIAL, INSTEAD ELECTING
											THAT THE DISPUTE BE RESOLVED BY A JUDGE.
										</li>
										<li>
											CLASS ACTION WAIVER. THE ARBITRATION WILL BE CONDUCTED ON AN INDIVIDUAL BASIS AND NOT IN A CLASS,
											CONSOLIDATED OR REPRESENTATIVE ACTION. THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS, MAY
											NOT OTHERWISE PRESIDE OVER ANY FORM OF A REPRESENTATIVE OR CLASS PROCEEDING, AND MAY NOT AWARD CLASS-WIDE
											RELIEF.
										</li>
										<li>
											Right to Opt Out. You have the right to opt out of this agreement to arbitrate by sending written notice of
											your decision to opt out, postmarked, to c/o 137 Glasgow Street, Suite 525, Kitchener, Ontario, N2G 4X8.
											Your written notice must include your name, address and email address. If you send written notice, then the
											mandatory arbitration provisions in these Terms will not apply to you or Kin Foundation. IF YOU DO NOT SEND
											THIS WRITTEN NOTICE, THEN YOU AGREE TO BE BOUND BY THE MANDATORY ARBITRATION PROVISIONS IN THIS SDK LICENSE.
										</li>
									</ol>
								</ul>
								<li>
									<u>Export Regulation.</u> The Service may be subject to Canadian and other applicable export control laws. You
									will not, directly or indirectly, export, re-export or release the Service to, or make the Service accessible
									from, any jurisdiction or country to which export, re-export or release is prohibited by law, rule or
									regulation. You will comply with all applicable federal laws, regulations and rules and complete all required
									undertakings (including obtaining any necessary export license or other governmental approval), before
									exporting, re-exporting, or releasing the Service to, or making the Service accessible from, any such
									jurisdiction or country.
								</li>
								<li>
									<u>Entire Agreement.</u> These Terms constitute the entire agreement between you and us pertaining to the
									subject matter hereof and supersede all prior or contemporaneous communications and proposals, whether
									electronic, oral or written, between you and us with respect to the Services. A printed version of these Terms
									and of any notice given in electronic form will be admissible in judicial or administrative proceedings based
									upon or relating to these Terms to the same extent and subject to the same conditions as other business
									documents and records originally generated and maintained in printed form.
								</li>
								<li>
									<u>Waiver.</u> Our failure to insist upon or enforce strict performance of any provision of these Terms will not
									be construed as a waiver of any provision or right. A waiver of any provision of LEGAL_1:54645128.5 these Terms
									must be in writing and a waiver in one instance will not preclude enforcement of such provision on other
									occasions.
								</li>
								<li>
									<u>Severable.</u> If any of the provisions contained in these Terms are determined to be void, invalid or
									otherwise unenforceable by a court of competent jurisdiction, such provision will be severed from these Terms
									and all other provisions of these Terms will remain in full force and effect.
								</li>
								<li>
									<u>Assignment.</u> You will not assign these Terms to any third party without our prior written consent. We may
									assign these Terms or any rights under these Terms to any third party without your consent. Any assignment in
									violation of this Section will be void. These Terms will be binding upon permitted assignees. These Terms will
									inure to the benefit of and be binding upon the parties, their permitted successors and permitted assignees.
								</li>
								<li>
									<u>Force Majeure.</u> We will not be liable for delays caused by any event or circumstances beyond Kin
									Foundation’s reasonable control, including acts of God, acts of government, flood, fire, earthquakes, civil
									unrest, acts of terror, strikes or other labour problems, Internet service failures or delays.
								</li>
								<li>
									<u>English Language.</u> It is the express wish of the parties that these Terms and all related documents be
									drawn up in English. C’est la volonté expresse des parties que la présente convention ainsi que les documents
									qui s’y rattachent soient rédigés en anglais.
								</li>
							</ol>
						</section>
					</TermsStyle>
				</Grid>
			</TermsContainerStyle>
		</ThemeProvider>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(
			{
				setTerms
			},
			dispatch
		)
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Terms);
