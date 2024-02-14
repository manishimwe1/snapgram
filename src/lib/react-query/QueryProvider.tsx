import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryclient = new QueryClient();
	return (
		<QueryClientProvider client={queryclient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
