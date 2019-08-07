import { Tooltip, Icon } from 'antd';
import { TooltipHoc, TitleStyled } from './style';
import React from 'react';
import './style.css';

const Title = () => {
	return (
		<TitleStyled>
			<div>
				<b>1.</b> Connect your Ledger device
			</div>
			<div>
				<b>2.</b> Unlock it
			</div>
			<div>
				<b>3.</b> Open the Kin application
			</div>
			<section>
				For more details: <br />{' '}
				<a target="_blank" href="kin.org/migrationLedger">
					{' '}
					kin.org/migrationLedger
				</a>
			</section>
		</TitleStyled>
	);
};

const TooltipLedger = () => {
	return (
		<TooltipHoc>
			<Tooltip title={Title} placement="bottomLeft">
				<div className="pressArea">
					<Icon type="info-circle" />
				</div>
			</Tooltip>
		</TooltipHoc>
	);
};

export default TooltipLedger;
