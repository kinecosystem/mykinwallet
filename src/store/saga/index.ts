import { all, fork } from 'redux-saga/effects';
import Wallet from './wallet/api';

export default function*() {
	yield all([fork(Wallet)]);
}
