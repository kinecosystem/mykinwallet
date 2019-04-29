import React, { FunctionComponent, useState } from 'react';
import { DerivationStyle, AddressContainer, CopyAddress } from './style';
import { H3 } from 'common/selectors';
import { SelectPremade as Select } from 'src/components/antd/index';
import copy from 'copy-to-clipboard';

interface IDerivationPath {
	address: string;
	onChange: Function;
}

const DerivationPath: FunctionComponent<IDerivationPath> = ({ onChange, address }) => {
	let [classes, setClasses] = useState('initial');
	let [select, setSelect] = useState(false);

	const handleCopy = () => {
		copy(address);
		setClasses('selected');
	};
	const handleChange = () => setSelect(true);
	return (
		<DerivationStyle>
			<header>
				<H3>Choose Derivation Path: </H3>
			</header>
			<Select
				placeholder="Choose BIP path"
				onChange={e => {
					handleChange();
					onChange(e);
				}}
				list={['22/564"/77']}
			/>
			{select && (
				<>
					<AddressContainer>
						<span>Address</span>
						<div className={`base ${classes}`}>
							{address} <div>Copied!</div>
						</div>
					</AddressContainer>
					<CopyAddress onClick={handleCopy}>Copy address</CopyAddress>
				</>
			)}
		</DerivationStyle>
	);
};

export default DerivationPath;
