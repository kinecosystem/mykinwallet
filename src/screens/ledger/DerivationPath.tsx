import React, { ReactNode, FunctionComponent, useState } from 'react';
import { DerivationStyle, AddressContainer, CopyAddress } from './style';
import { H3 } from 'common/selectors';
import { SelectPremade as Select } from 'src/components/antd/index';
import { addressGenerator } from 'src/components/helpers/addressGenerator';
import handleCopy from '../../components/helpers/copy';

interface IDerivationPath {
    stellarAddress: string;
    solanaAddress: string;
	onChange: Function;
	initial: string;
}

const DerivationPath: FunctionComponent<IDerivationPath> = ({ onChange, stellarAddress, solanaAddress, initial }) => {
	let [select, setSelect] = useState(false);

	const handleChange = () => {
		setSelect(true);
	};
	return (
		<DerivationStyle>
			<header>
				<H3>Choose Derivation Path: </H3>
			</header>
			<p><b>Please Note:</b> Upon selection, the address will be displayed on your device and approval will be required.</p>
			<Select
				defaultValue={initial && initial}
				placeholder="Choose BIP path"
				onChange={e => {
					handleChange();
					onChange(e);
				}}
				list={[
					"44'/2017'/0'",
					"44'/2017'/1'",
					"44'/2017'/2'",
					"44'/2017'/3'",
					"44'/2017'/4'",
					"44'/2017'/5'",
					"44'/2017'/6'",
					"44'/2017'/7'",
					"44'/2017'/8'",
					"44'/2017'/9'"
				]}
			/>

			{(select || initial) && solanaAddress && (
				<>
                    <AddressContainer>
						<span><b>SOLANA ADDRESS (KIN 2/3)</b></span>
						<div className={`base`}>{solanaAddress && <>{addressGenerator(solanaAddress, window.innerWidth < 576)}</>}</div>
					</AddressContainer>
					<CopyAddress onClick={() => handleCopy(solanaAddress)}>Copy address</CopyAddress>
					<AddressContainer>
						<span><b>STELLAR ADDRESS (KIN 2/3)</b></span>
						<div className={`base`}>{stellarAddress && <>{addressGenerator(stellarAddress, window.innerWidth < 576)}</>}</div>
					</AddressContainer>
					<CopyAddress onClick={() => handleCopy(stellarAddress)}>Copy address</CopyAddress>
				</>
			)}
		</DerivationStyle>
	);
};

export default DerivationPath;
