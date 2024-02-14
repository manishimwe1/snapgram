import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FileUplaoder from "../shared/FileUplaoder";
import { Textarea } from "../ui/textarea";
import { Models } from "appwrite";
import {
	useCreatePost,
	useUpdatePost,
} from "@/lib/react-query/queriesandMutation";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";

type PostFormProps = {
	post?: Models.Document;
	action: "Create" | "Update";
};
const PostForm = ({ post, action }: PostFormProps) => {
	const {
		mutateAsync: createPost,
		isPending: isCreatingPost,
	} = useCreatePost();
	const {
		mutateAsync: updatePost,
		isPending: isUpdatingPost,
	} = useUpdatePost();

	const { user } = useUserContext();
	const { toast } = useToast();
	const navigate = useNavigate();

	// console.log(post?.imageUrl);

	const form = useForm<z.infer<typeof PostValidation>>({
		resolver: zodResolver(PostValidation),
		defaultValues: {
			caption: post ? post.caption : "",
			file: [],
			location: post ? post.location : "",
			tags: post ? post.tags.join(",") : "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(
		values: z.infer<typeof PostValidation>,
	) {
		if (post && action === "Update") {
			const updatedPost = await updatePost({
				...values,
				postId: post?.$id,
				imageId: post?.imageId,
				imageUrl: post?.imageUrl,
			});

			if (!updatedPost) {
				toast({
					title: "please try again",
				});
			}
			return navigate(`/posts/${post.$id}`);
		}
		const newPost = await createPost({
			...values,
			userId: user.id,
		});

		if (!newPost) {
			toast({
				title: "Failed to add post try again",
				variant: "destructive",
			});
		}

		navigate("/");
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-9 w-full max-w-5xl'>
				<FormField
					control={form.control}
					name='caption'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Caption
							</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									className='shad-textarea custom-scrollbar'
								/>
							</FormControl>

							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Add Photos
							</FormLabel>
							<FormControl>
								<FileUplaoder
									fieldChange={
										field.onChange
									}
									mediaUrl={
										post?.imageUrl
									}
								/>
							</FormControl>

							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Add Location
							</FormLabel>
							<FormControl>
								<Input
									type='text'
									{...field}
									className='shad-input'
								/>
							</FormControl>

							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='tags'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Add Tags (separated by comma
								" , ")
							</FormLabel>
							<FormControl>
								<Input
									type='text'
									{...field}
									className='shad-input'
									placeholder='Next js, React, Java'
								/>
							</FormControl>

							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>

				<div className=' flex gap-4 items-center justify-end'>
					<Button
						type='button'
						className='shad-button_dark_4'>
						Cancel
					</Button>
					<Button
						disabled={
							isCreatingPost || isUpdatingPost
						}
						type='submit'
						className='shad-button_primary whitespace-nowrap'>
						{isCreatingPost ||
							(isUpdatingPost && <Loader />)}
						{action} Post
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default PostForm;
