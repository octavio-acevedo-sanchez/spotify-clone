'use client';

import type { Song } from '@/types';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import MediaItem from './MediaItem';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

interface LibraryProps {
	songs: Song[];
}

const Library = ({ songs }: LibraryProps): React.ReactNode => {
	const authModal = useAuthModal();
	const uploadModal = useUploadModal();
	const { user } = useUser();

	const onClick = (): void => {
		if (!user) {
			authModal.onOpen();
			return;
		}

		// TODO: Check for subscription

		uploadModal.onOpen();
	};

	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between px-5 pt-4'>
				<div className='inline-flex items-center gap-x-2'>
					<TbPlaylist className='text-neutral-400' size={26} />
					<p className='text-neutral-400 font-medium text-md'>Your Library</p>
				</div>
				<AiOutlinePlus
					onClick={onClick}
					size={20}
					className='text-neutral-400 cursor-pointer hover:text-white transition'
				/>
			</div>
			<div className='flex flex-col gap-y-2 mt-4 px-3'>
				{songs.map(item => (
					<MediaItem key={item.id} data={item} onClick={() => {}} />
				))}
			</div>
		</div>
	);
};

export default Library;
