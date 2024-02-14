import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type searchProps = {
	isSearchFeching: boolean;
	searchedPosts: Models.Document[];
};

const SearchResults = ({
	isSearchFeching,
	searchedPosts,
}: searchProps) => {
	if (isSearchFeching) return <Loader />;

	if (
		searchedPosts &&
		searchedPosts.documents.length > 0
	) {
		return (
			<GridPostList posts={searchedPosts.documents} />
		);
	}
	return (
		<p className='text-light-4 mt10 text-center w-full'>
			No search found
		</p>
	);
};

export default SearchResults;
