import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type GridPostListProps = {
	posts: Models.Document[];
	showUser?: boolean;
	showStart?: boolean;
};
const GridPostList = ({
	posts,
	showStart = true,
	showUser = true,
}: GridPostListProps) => {
	const { user } = useUserContext();
	return (
		<ul className='grid-container'>
			{posts.map((post) => (
				<li
					className='relative min-w-80 h-80'
					key={post.$id}>
					<Link
						to={`/posts/${post.$id}`}
						className='grid-post_link'>
						<img
							src={post.imageUrl}
							alt='post image'
							className='h-full w-full object-cover'
						/>
					</Link>
					<div className='grid-post_user'>
						{showUser && (
							<div className='flex items-center justify-start gap-2'>
								<img
									src={
										post.creator
											.imageUrl
									}
									alt='creator'
									className='h-8 w-8 rounded-full'
								/>
								<p className='line-clamp-1'>
									{post.creator.name}
								</p>
							</div>
						)}
						{showStart && (
							<PostStats
								post={post}
								userId={user.id}
							/>
						)}
					</div>
				</li>
			))}
		</ul>
	);
};

export default GridPostList;
