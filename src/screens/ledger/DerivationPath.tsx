import React, { FunctionComponent, useState } from 'react';
import { DerivationStyle, AddressContainer, CopyAddress } from './style';
import { H3 } from 'common/selectors';
import { SelectPremade as Select } from 'src/components/antd/index';
import copy from 'copy-to-clipboard';
import { addressGenerator } from 'src/components/helpers/addressGenerator';

interface IDerivationPath {
	address: string;
	onChange: Function;
	initial: string;
}

const DerivationPath: FunctionComponent<IDerivationPath> = ({ onChange, address, initial }) => {
	let [classes, setClasses] = useState('initial');
	let [select, setSelect] = useState(false);

	const handleCopy = () => {
		copy(address);
		setClasses('selected');
		setTimeout(() => {
			setClasses('initial');
		}, 1500);
	};
	const handleChange = () => {
		setSelect(true);
	};
	return (
		<DerivationStyle>
			<header>
				<H3>Choose Derivation Path: </H3>
			</header>
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

			{select && (
				<>
					<AddressContainer>
						<span>ADDRESS</span>
						<div className={`base ${classes}`}>
							{address && (
								<>
									{addressGenerator(address)} <div>Copied!</div>
								</>
							)}
						</div>
					</AddressContainer>
					<CopyAddress onClick={handleCopy}>Copy address</CopyAddress>
				</>
			)}
		</DerivationStyle>
	);
};

export default DerivationPath;
