import { useState } from "react";

type PromiseFunction<Succeeded> = (
	...parameters: never[]
) => Promise<Succeeded>;

type UseAsync<Succeeded, Failed, F extends PromiseFunction<Succeeded>> = {
	data: Succeeded | null;
	error: Failed | null;
	execute: (...parameters: Parameters<F>) => void;
	pending: boolean;
};

export const useAsync = <
	F extends PromiseFunction<Succeeded>,
	Succeeded extends Awaited<ReturnType<F>>,
	Failed = unknown,
>(
	fetcher: F,
): UseAsync<Awaited<ReturnType<F>>, Failed, F> => {
	const [data, setData] = useState<Succeeded | null>(null);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<Failed | null>(null);

	const execute = (...parameters: Parameters<F>) => {
		setPending(true);
		fetcher(...parameters)
			.then(setData)
			.catch(setError)
			.finally(() => {
				setPending(false);
			});
	};

	return {
		data,
		error,
		execute,
		pending,
	};
};
