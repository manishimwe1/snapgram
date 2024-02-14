import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

const SavedPostCard = ({
	post,
}: {
	post: Models.Document;
}) => {
	console.log(post);

	return (
		<div className='relative min-w-80 h-80 mt-6 md:mt-10'>
			<Link
				to={`/posts/${post.$id}`}
				className='grid-post_link'>
				<img
					src={post.post.imageUrl}
					alt='post image'
					className='h-full w-full object-cover'
				/>
			</Link>
			<div className='bg-gradient-to-t from-dark-3 to-transparent -mt-10 flex items-center   w-full bottom-0 inset-x-0 py-4 px-5 absolute rounded-b-3xl'>
				<PostStats
					post={post.post}
					userId={post.$id}
				/>
			</div>
		</div>
	);
};

export default SavedPostCard;
