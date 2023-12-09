'use client';

import type { Song } from '@/types';
import SongItem from './SongItem';
import useOnPlay from '@/hooks/useOnPlay';

interface PageContentProps {
	songs: Song[];
}
const PageContent = ({ songs }: PageContentProps): React.ReactNode => {
	const onPlay = useOnPlay(songs);

	if (songs.length === 0) {
		return <div className='mt-4 text-netural-400'> No songs available</div>;
	}

	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4'>
			{songs.map(item => (
				<SongItem
					key={item.id}
					onClick={(id: string) => {
						onPlay(id);
					}}
					data={item}
				/>
			))}
		</div>
	);
};

export default PageContent;
