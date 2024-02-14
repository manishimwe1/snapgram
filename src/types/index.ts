export type INavLink = {
	imgURL: string;
	route: string;
	label: string;
};

export type IUpdateUser = {
	userId: string;
	name: string;
	bio: string;
	imageId: string;
	imageUrl: URL | string;
	file: File[];
};

export type INewPost = {
	userId: string;
	caption: string;
	file: File[];
	location?: string;
	tags?: string;
};

export type IUpdatePost = {
	postId: string;
	caption: string;
	imageId: string;
	imageUrl: URL;
	file: File[];
	location?: string;
	tags?: string;
};

export type IUser = {
	id: string;
	name: string;
	username: string;
	email: string;
	imageUrl: string;
	bio: string;
};

export type INewUser = {
	name: string;
	email: string;
	username: string;
	password: string;
};

export type IContextType = {
	user: IUser;
	isPending: boolean;
	isAuthenticated: boolean;
	setUser: React.Dispatch<React.SetStateAction<IUser>>;
	setIsAuthenticated: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	checkAuthUser: () => Promise<boolean>;
};

export interface Post {
	$collectionId: string;
	$createdAt: string; // Consider parsing this to a Date object if needed
	$databaseId: string;
	$id: string;
	$permissions: string[]; // Array of permissions strings
	$updatedAt: string; // Consider parsing this to a Date object if needed
	caption: string;
	creator: {
		name: string;
		username: string;
		userId: string;
		email: string;
		bio: string | null;
		// Add more properties if available
	};
	imageId: string;
	imageUrl: string;
	likes: any[]; // You can define a type for likes if needed
	location: string;
	save: any[]; // You can define a type for save if needed
	tags: string[]; // Array of tag strings
}

export interface PostResponse {
	total: number;
	documents: Post[];
}
