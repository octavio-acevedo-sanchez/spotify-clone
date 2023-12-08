'use client';

import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import Input from './Input';

const SearchInput = (): React.ReactNode => {
	const router = useRouter();
	const [value, setValue] = useState<string>('');
	const debouncedValue = useDebounce<string>(value, 500);

	useEffect(() => {
		const query = { title: debouncedValue };

		const url = qs.stringifyUrl({
			url: '/search',
			query
		});

		router.push(url);
	}, [debouncedValue, router]);

	return (
		<Input
			placeholder='What do you wnat to listen to?'
			value={value}
			onChange={e => {
				setValue(e.target.value);
			}}
		/>
	);
};

export default SearchInput;
