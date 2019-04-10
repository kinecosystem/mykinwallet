import { all, fork } from 'redux-saga/effects';
import authSaga from './developer/auth';
import categoriesSaga from './site/categories';
import statsSaga from './site/stats';
import blockchainSaga from './site/blockchainExplorer';

// export default function*() {
//   yield all([fork(authSaga), fork(categoriesSaga), fork(statsSaga), fork(blockchainSaga)]);
// }
export default function*() {
	yield all([]);
}
