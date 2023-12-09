import type { Song } from '@/types';
import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import { useUser } from './useUser';

const useOnPlay = (songs: Song[]): ((id: string) => void) => {
	const player = usePlayer();
	const authModal = useAuthModal();
	const { user } = useUser();

	const onPlay = (id: string): void => {
		if (!user) {
			authModal.onOpen();
			return;
		}

		player.setId(id);
		player.setIds(songs.map(song => song.id));
	};

	return onPlay;
};

export default useOnPlay;
