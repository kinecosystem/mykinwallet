export interface ICategory {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface ICategorieslState {
	categories: ICategory[];
	selectedCategory?: ICategory;
}

export interface IApp {
	id: number;
	name: string;
	platform: string;
	categoryId: number;
	createAt: string;
	updatedAt: string;
}

export interface IApps {
	[key: number]: IApp[];
}
