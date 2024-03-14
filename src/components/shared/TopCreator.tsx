import { useALLUsers } from "@/lib/react-query/queriesandMutation";
import Loader from "./Loader";
import { Button } from "../ui/button";

const TopCreator = () => {
	const { data: allUsers, isFetching } = useALLUsers();

	if (isFetching) {
		return (
			<div className='flex justify-center items-center w-[250px]'>
				<Loader />
			</div>
		);
	}
	return (
		<div className='hidden lg:block w-[250px] mt-10 h-screen  overflow-y-scroll custom-scrollbar'>
			<h2 className='h3-bold md:h2-bold text-center w-full'>
				Top Creator
			</h2>
			<div className=' px-10'>
				<div className=' w-full '>
					{allUsers?.documents.map((user) => (
						<div
							className='flex flex-col w-full   gap-2  p-4  items-center '
							key={user.$id}>
							<img
								src={user.imageUrl}
								alt='user Image'
								className='rounded-full h-[40px] w-[40px] object-cover cursor-pointer'
							/>
							{/* <h2 className=' text-xs text-light-1 whitespace-nowrap cursor-pointer'>
								{user.name}
							</h2> */}
							<p className='text-light-3 cursor-pointer hover:underline hover:text-light-4 text-[10px]'>
								@{user.username}
							</p>

							<Button
								className='bg-primary-500/20 hover:bg-primary-600 text-xs'
								size={"sm"}>
								Follow
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TopCreator;
