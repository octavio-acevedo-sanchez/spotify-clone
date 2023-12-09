import { useEffect, useMemo, useState } from 'react';
import type { Song } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';

interface SongByIdProps {
	isLoading: boolean;
	song: Song | undefined;
}

const useGetSongById = (id?: string): SongByIdProps => {
	const [isLoading, setIsLoading] = useState(false);
	const [song, setSong] = useState<Song | undefined>(undefined);
	const { supabaseClient } = useSessionContext();

	useEffect(() => {
		if (!id) {
			return;
		}

		setIsLoading(true);

		const fetchSong = async (): Promise<string | undefined> => {
			const { data, error } = await supabaseClient
				.from('songs')
				.select('*')
				.eq('id', id)
				.single();

			if (error) {
				return toast.error(error.message);
			}

			setSong(data as Song);
			setIsLoading(false);
		};

		void fetchSong();
	}, [id, supabaseClient]);

	return useMemo(
		() => ({
			isLoading,
			song
		}),
		[isLoading, song]
	);
};

export default useGetSongById;
