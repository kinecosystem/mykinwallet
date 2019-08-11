import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const SignTransaction = props => {
	return;
};

const mapStateToProps = state => {
	return { blockchain: state.blockchain.blockchain };
};

const mapDispatchToProps = dispatch => ({ action: bindActionCreators({}, dispatch) });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignTransaction);
