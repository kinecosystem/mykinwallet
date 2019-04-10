export interface ILatestTransactions {
	readonly id: string;
	readonly ledger: string;
	readonly fee_paid: string;
	readonly created_at: string;
}

export interface ILatestLedgers {
	readonly id: string;
	readonly transaction_count: string;
	readonly operation_count: string;
	readonly closed_at: string;
}

export interface IProdacetPage {}

export interface IBlockchainState {
	latestTransactions: ILatestTransactions[];
	latestLedgers: ILatestLedgers[];
	prodactPage: IProdacetPage;
	pageOperations: IProdacetPage;
	accountPage: IProdacetPage;
	accountRecentActivity: IProdacetPage;
	legersTransactions: IProdacetPage;
	nextLinkTransaction: string;
	nextLinkLegers: string;
	type: string;
}
