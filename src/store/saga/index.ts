import { all, fork } from 'redux-saga/effects';
import categoriesSaga from './site/categories';
import statsSaga from './site/stats';

// export default function*() {
//   yield all([fork(authSaga), fork(categoriesSaga), fork(statsSaga), fork(blockchainSaga)]);
// }
export default function*() {
	yield all([]);
}
