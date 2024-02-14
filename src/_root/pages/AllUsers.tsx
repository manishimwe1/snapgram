import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useALLUsers } from "@/lib/react-query/queriesandMutation";

const AllUsersPage = () => {
	const { data: allUser, isPending } = useALLUsers();
	if (isPending)
		return (
			<div className='flex items-center justify-center mt-10 w-full'>
				<Loader />
			</div>
		);
	// console.log(allUser?.documents);

	return (
		<div className=' w-full mt-10'>
			<div className=' grid grid-cols-1 space-y-10 md:space-y-0 md:grid-cols-4  w-full'>
				{allUser?.documents.map((user) => (
					<div
						className='flex flex-col w-full  gap-2  p-4  items-center '
						key={user.$id}>
						<img
							src={user.imageUrl}
							alt='user Image'
							className='rounded-full h-[60px] w-[60px] object-cover'
						/>
						<h2 className='font-bold text-[15px] whitespace-nowrap'>
							{user.name}
						</h2>
						<p className='text-light-3 cursor-pointer hover:underline hover:text-light-4 text-[12px]'>
							@{user.username}
						</p>

						<Button className='bg-primary-500 hover:bg-primary-600'>
							Follow
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllUsersPage;
