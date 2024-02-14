import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) =>
	URL.createObjectURL(file);

export function formatTimeAgo(dateString: string): string {
	const currentDate = new Date();
	const pastDate = new Date(dateString);

	const timeDifferenceInSeconds = Math.floor(
		(currentDate.getTime() - pastDate.getTime()) / 1000,
	);

	const intervals = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	for (const [unit, seconds] of Object.entries(
		intervals,
	)) {
		const intervalCount = Math.floor(
			timeDifferenceInSeconds / seconds,
		);
		if (intervalCount >= 1) {
			return intervalCount === 1
				? `1 ${unit} ago`
				: `${intervalCount} ${unit}s ago`;
		}
	}

	return "just now";
}

// export const multiFormatDateString = (
// 	timestamp: string = "",
// ): string => {
// 	const timestampNum = Math.round(
// 		new Date(timestamp).getTime() / 1000,
// 	);
// 	const date: Date = new Date(timestampNum * 1000);
// 	const now: Date = new Date();

// 	const diff: number = now.getTime() - date.getTime();
// 	const diffInSeconds: number = diff / 1000;
// 	const diffInMinutes: number = diffInSeconds / 60;
// 	const diffInHours: number = diffInMinutes / 60;
// 	const diffInDays: number = diffInHours / 24;

// 	switch (true) {
// 		case Math.floor(diffInDays) >= 30:
// 			return formatDateString(timestamp);
// 		case Math.floor(diffInDays) === 1:
// 			return `${Math.floor(diffInDays)} day ago`;
// 		case Math.floor(diffInDays) > 1 && diffInDays < 30:
// 			return `${Math.floor(diffInDays)} days ago`;
// 		case Math.floor(diffInHours) >= 1:
// 			return `${Math.floor(diffInHours)} hours ago`;
// 		case Math.floor(diffInMinutes) >= 1:
// 			return `${Math.floor(
// 				diffInMinutes,
// 			)} minutes ago`;
// 		default:
// 			return "Just now";
// 	}
// };

export const checkIsLiked = (
	likeList: string[],
	userId: string,
) => {
	return likeList.includes(userId);
};
