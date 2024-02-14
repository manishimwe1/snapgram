import { PostResponse } from "@/types";
import GridPostList from "./GridPostList";
import Loader from "./Loader";

type searchProps = {
	isSearchFeching: boolean;
	searchedPosts: PostResponse;
};

const SearchResults = ({
	isSearchFeching,
	searchedPosts,
}: searchProps) => {
	if (isSearchFeching) return <Loader />;
	console.log(searchedPosts);

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
