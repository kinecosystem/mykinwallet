import React, { useState, ReactNode } from 'react';
import { Modal } from 'antd';
import { ModalStyled, ModalStyledX, ModalHeader } from './style';
import LogoGreen from 'src/images/logo/LOGO_GREEN.svg';
import blackClose from 'src/images/x_button.svg';
import { Grid } from 'common/grid';

interface IModal {
	button: string;
	title: string;
	children: ReactNode;
	type: string;
}

const ModalG: React.FunctionComponent<IModal> = ({ button, type, children, title }) => {
	const [visible, setVisible] = useState(false);

	const showModal = (e) => {
		setVisible(true);
	};

	const handleOk = () => {
		setVisible(false);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	return (
		<ModalStyled>
			<div onClick={showModal}>{button}</div>
			<Modal
				footer={null}
				closable={false}
				width="100%"
				height="100%"
				style={{ height: '100%', top: 0 }}
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Grid>
					<ModalHeader>
						<div>
							<img src={LogoGreen} alt="modal_icon" /> Kin Ecosystem
						</div>
						<ModalStyledX onClick={handleCancel}>
							<img src={blackClose} alt="X" />
						</ModalStyledX>
					</ModalHeader>
					{children}
				</Grid>
			</Modal>
		</ModalStyled>
	);
};

export default ModalG;
