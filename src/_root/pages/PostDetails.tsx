import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesandMutation";
import { formatTimeAgo } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
	const { id } = useParams();
	const { user } = useUserContext();
	const { data: post, isPending } = useGetPostById(
		id || "",
	);

	const handledelete = () => {};
	return (
		<div className='post_details-container'>
			{isPending ? (
				<Loader />
			) : (
				<div className='post_details-card'>
					<img
						src={post?.imageUrl}
						alt='post '
						className='post_details-img'
					/>
					<div className='post_details-info'>
						<div className='flex-between w-full'>
							<Link
								to={`/profile/${post?.creator.$id}`}
								className='flex items-center gap-3'>
								<img
									src={
										post?.creator
											?.imageUrl ||
										"/assets/icons/profile-placeholder.svg"
									}
									alt='creator'
									className='rounded-full w-8 h-8 lg:w-12 lg:h-12'
								/>

								<div className='flex flex-col'>
									<p className='base-medium lg:body-bold text-light-1'>
										{post?.creator.name}
									</p>
									<div className='flex-center gap-2 text-light-3 '>
										<p className='subtle-semibold'>
											{formatTimeAgo(
												post?.$createdAt ||
													"",
											)}
										</p>
										-
										<p className='subtle-semibold lg:small-regular whitespace-nowrap'>
											{post?.location}
										</p>
									</div>
								</div>
							</Link>

							<div className='flex-center'>
								<Link
									className={`${
										user.id !==
											post?.creator
												.$id &&
										"hidden"
									}`}
									to={`/update-post/${post?.$id}`}>
									<img
										src='/assets/icons/edit.svg'
										alt=''
										className='h-[20px] lg:w-[40px] w-[20px] lg:h-[40px]'
									/>
								</Link>
								<Button
									onClick={handledelete}
									variant={"ghost"}
									className={`ghost-details_btn ${
										user.id !==
											post?.creator
												.$id &&
										"hidden"
									}`}>
									<img
										src='/assets/icons/delete.svg'
										alt='delete'
										className='h-[20px] lg:w-[40px] w-[20px] lg:h-[40px]'
									/>
								</Button>
							</div>
						</div>
						<hr className='border w-full border-dark-4/80' />
						<div className='small-medium lg:base-medium py-5'>
							<p className='text-lg capitalize'>
								{post?.caption}
							</p>

							<ul className='flex gap-1 mt-2'>
								{post?.tags.map(
									(tag: string) => (
										<li
											key={tag}
											className='text-light-3'>
											#{tag}
										</li>
									),
								)}
							</ul>
						</div>
						<div className='w-full'>
							<PostStats
								post={post}
								userId={user.id}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostDetails;
