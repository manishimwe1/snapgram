import Loader from "@/components/shared/Loader";
import SavedPostCard from "@/components/shared/SavedPostCard";
import { useAllSavedPosts } from "@/lib/react-query/queriesandMutation";

const Saved = () => {
	const { data: savedPost, isFetching } =
		useAllSavedPosts();
	console.log(savedPost?.total);

	if (isFetching)
		return (
			<div className='flex items-center -mt-96 w-full'>
				<Loader />
			</div>
		);
	if (!savedPost?.total)
		return (
			<p className=' flex-1 text-light-3 text-center mt-36 text-lg'>
				No Post Saved Found!
			</p>
		);
	return (
		<div className='h-screen  flex flex-1 overflow-hidden scrollbar-hide '>
			<div className='grid-container custom-scrollbar overflow-y-scroll w-full px-4'>
				{savedPost?.documents?.map(
					(item, index) => (
						<SavedPostCard
							key={`page-${index}`}
							post={item}
						/>
					),
				)}
			</div>
		</div>
	);
};

export default Saved;
