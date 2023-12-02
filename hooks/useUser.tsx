import { useEffect, useState, createContext, useContext } from 'react';
import {
	useUser as useSupaUser,
	useSessionContext
} from '@supabase/auth-helpers-react';
import type { User } from '@supabase/auth-helpers-react';

import type { UserDetails, Subscription } from '@/types';

interface UserContextType {
	accessToken: string | null;
	user: User | null;
	userDetails: UserDetails | null;
	isLoading: boolean;
	subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(
	undefined
);

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface Props {
	[propName: string]: any;
}
// export type Props = Record<string, any>;

export const MyUserContextProvider = (props: Props): React.ReactNode => {
	const {
		session,
		isLoading: isLoadingUser,
		supabaseClient: supabase
	} = useSessionContext();
	const user = useSupaUser();
	const accessToken = session?.access_token ?? null;
	const [isLoadingData, setIsloadingData] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [subscription, setSubscription] = useState<Subscription | null>(null);

	const getUserDetails = (): any => supabase.from('users').select('*').single();
	const getSubscription = (): any =>
		supabase
			.from('subscriptions')
			.select('*, prices(*, products(*))')
			.in('status', ['trialing', 'active'])
			.single();

	useEffect(() => {
		if (user && !isLoadingData && !userDetails && !subscription) {
			setIsloadingData(true);
			void Promise.allSettled([getUserDetails(), getSubscription()]).then(
				results => {
					const userDetailsPromise = results[0];
					const subscriptionPromise = results[1];

					if (userDetailsPromise.status === 'fulfilled')
						setUserDetails(userDetailsPromise.value.data as UserDetails);

					if (subscriptionPromise.status === 'fulfilled')
						setSubscription(subscriptionPromise.value.data as Subscription);

					setIsloadingData(false);
				}
			);
		} else if (!user && !isLoadingUser && !isLoadingData) {
			setUserDetails(null);
			setSubscription(null);
		}
	}, [user, isLoadingUser]);

	const value = {
		accessToken,
		user,
		userDetails,
		isLoading: isLoadingUser || isLoadingData,
		subscription
	};

	return <UserContext.Provider value={value} {...props} />;
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error(`useUser must be used within a MyUserContextProvider.`);
	}

	return context;
};
