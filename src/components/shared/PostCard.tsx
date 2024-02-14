import { useUserContext } from "@/context/AuthContext";
import { formatTimeAgo } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

const PostCard = ({ post }: { post: Models.Document }) => {
	const { user } = useUserContext();
	if (!post.creator) return;
	// console.log(post.imageUrl);

	return (
		<div className='post-card'>
			<div className='flex-between'>
				<div className='flex items-center gap-3'>
					<Link
						to={`/profile/${post.creator.$id}`}>
						<img
							src={
								post?.creator?.imageUrl ||
								"/public/assets/icons/profile-placeholder.svg"
							}
							alt='creator'
							className='rounded-full w-12 lg:h-12'
						/>
					</Link>
					<div className='flex flex-col'>
						<p className='base-medium lg:body-bold text-light-1'>
							{post.creator.name}
						</p>
						<div className='flex-center gap-2 text-light-3 '>
							<p className='subtle-semibold'>
								{formatTimeAgo(
									post.$createdAt,
								)}
							</p>
							-
							<p className='subtle-semibold lg:small-regular whitespace-nowrap'>
								{post.location}
							</p>
						</div>
					</div>
				</div>
				<Link
					to={`/update-post/${post.$id}`}
					className={`${
						user.id !== post.creator.$id &&
						"hidden"
					}`}>
					<img
						src='/public/assets/icons/edit.svg'
						alt='edit'
						className='h-[20px] w-[20px'
					/>
				</Link>
			</div>
			<Link to={`/posts/${post.$id}`}>
				<div className='small-medium lg:base-medium py-5'>
					<p>{post.caption}</p>

					<ul className='flex gap-1 mt-2'>
						{post.tags.map((tag: string) => (
							<li
								key={tag}
								className='text-light-3'>
								#{tag}
							</li>
						))}
					</ul>
				</div>
				<img
					src={
						post.imageUrl ||
						"/public/assets/icons/profile-placeholder.svg"
					}
					alt='post Image'
					className='post-card_img'
				/>
			</Link>

			<PostStats post={post} userId={user.id} />
		</div>
	);
};

export default PostCard;
