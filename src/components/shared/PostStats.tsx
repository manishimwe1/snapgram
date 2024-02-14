import {
	useDeleteSavePost,
	useGetCurrentUser,
	useLikePost,
	useSavePost,
} from "@/lib/react-query/queriesandMutation";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type Props = {
	post?: Models.Document;
	userId: string;
};
const PostStats = ({ post, userId }: Props) => {
	const likesList = post?.likes.map(
		(user: Models.Document) => user.$id,
	);

	const [likes, setLikes] = useState(likesList);
	const [isSaved, setIsSaved] = useState(false);

	const { mutate: likePost } = useLikePost();
	const { mutate: savePost, isPending: isSaving } =
		useSavePost();
	const {
		mutate: deleteSavePost,
		isPending: isDeleting,
	} = useDeleteSavePost();

	const { data: currentUser } = useGetCurrentUser();

	const savePostRecord = currentUser?.save.find(
		(record: Models.Document) =>
			record.post.$id === post?.$id,
	);

	useEffect(() => {
		setIsSaved(!!savePostRecord); //===>savePostRecord ? true : false
	}, [currentUser]);

	const handleLikePost = (e: React.MouseEvent) => {
		e.stopPropagation();

		let newLikes = [...likes];
		const hasLiked = newLikes.includes(userId);

		if (hasLiked) {
			newLikes = newLikes.filter(
				(id) => id !== userId,
			);
		} else {
			newLikes.push(userId);
		}
		setLikes(newLikes);
		likePost({
			postId: post?.$id || "",
			likesArray: newLikes,
		});
	};

	const handleSavePost = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (savePostRecord) {
			setIsSaved(false);
			deleteSavePost(savePostRecord.$id);
		} else {
			savePost({ postId: post?.$id || "", userId });
			setIsSaved(true);
		}
	};
	return (
		<div className='flex justify-between items-center z-20 w-full '>
			<div className='flex gap-2 mr-5'>
				<img
					src={`${
						checkIsLiked(likes, userId)
							? "/assets/icons/liked.svg"
							: "/assets/icons/like.svg"
					}`}
					alt='like'
					width={20}
					height={20}
					onClick={handleLikePost}
					className='cursor-pointer'
				/>
				<p className='small-medium lg:base-medium'>
					{likes.length}
				</p>
			</div>
			<div className='flex gap-2'>
				{isSaving || isDeleting ? (
					<Loader />
				) : (
					<img
						src={`${
							isSaved
								? "/assets/icons/saved.svg"
								: "/assets/icons/save.svg"
						}`}
						alt='like'
						width={20}
						height={20}
						onClick={handleSavePost}
						className='cursor-pointer'
					/>
				)}
			</div>
		</div>
	);
};

export default PostStats;
