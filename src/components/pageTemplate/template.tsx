import React, { ReactNode } from 'react';
import Layout from 'src/components/layout';
import { purpleLight } from 'style/theme/generalVariables';
import Title from 'src/components/title/title';
import { Structure_container, SideContainer, SideContainer_content } from './style';
import Progressbar from 'src/components/progress/Line';
import Conditions from './Conditions';
import Error from 'src/components/error/error';
import { connect } from 'react-redux';
import { setTemplateErrors } from 'src/store/actions/errors/actionsErrors';
import { bindActionCreators } from 'redux';
import Context from './context';

interface ITemplate {
	props: {
		title: {
			main: string;
			sub: string;
		};
		step: number;
		children: ReactNode;
	};
}
const errorMock = ['sdas asd as   asd asd as dasdasfkja las asd m', 'ryehjnbgf tgjrtyj  tjrtgjrtgjr rtj rty jr'];

const Template: React.SFC<ITemplate> = props => {
	console.log(props);
	const { title, step, children } = props;
	return (
		<Layout background={purpleLight}>
			<Structure_container>
				{/** Left white title */}
				<Title main={title.main} sub={title.sub} />
				{/** right white container */}
				<SideContainer>
					<SideContainer_content>
						<Progressbar step={step} />
						<Error errors={errorMock} />
						<Context actions={props}>{children}</Context>
						<Conditions />
					</SideContainer_content>
				</SideContainer>
			</Structure_container>
		</Layout>
	);
};

const mapStateToProps = state => {
	return {
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return { action: bindActionCreators({ ...setTemplateErrors }, dispatch) };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Template);
