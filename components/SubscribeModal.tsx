'use client';

import { useState } from 'react';
import type { Price, ProductWithPrice } from '@/types';
import Modal from './Modal';
import Button from './Button';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import { postData } from '@/libs/helpers';
import { getStripe } from '@/libs/stripeClient';
import useSubscribeModal from '@/hooks/useSubscribeModal';

interface SubscribeModalProps {
	products: ProductWithPrice[];
}

const formatPrice = (price: Price): string => {
	const priceString = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: price.currency,
		minimumFractionDigits: 0
	}).format((price?.unit_amount ?? 0) / 100);

	return priceString;
};

const SubscribeModal = ({ products }: SubscribeModalProps): React.ReactNode => {
	const subscribeModal = useSubscribeModal();
	const { user, isLoading, subscription } = useUser();
	const [priceIdLoading, setPriceIdLoading] = useState<string>();

	const onChange = (open: boolean): void => {
		if (!open) {
			subscribeModal.onClose();
		}
	};

	const handleCheckout = async (price: Price): Promise<void> => {
		setPriceIdLoading(price.id);

		if (!user) {
			setPriceIdLoading(undefined);
			toast.error('Must be logged in');

			return;
		}

		if (subscription) {
			setPriceIdLoading(undefined);
			toast('Already subscribed');

			return;
		}

		try {
			const { sessionId } = await postData({
				url: '/api/create-checkout-session',
				data: { price }
			});

			const stripe = await getStripe();
			await stripe?.redirectToCheckout({ sessionId });
		} catch (error) {
			toast.error((error as Error)?.message);
		} finally {
			setPriceIdLoading(undefined);
		}
	};

	let content = <div className='text-center'>No products available.</div>;

	if (products.length) {
		content = (
			<div>
				{products.map(product => {
					if (!product.prices?.length) {
						return <div key={product.id}>No prices available</div>;
					}

					return product.prices.map(price => (
						<Button
							key={price.id}
							onClick={() => {
								void handleCheckout(price);
							}}
							disabled={isLoading || price.id === priceIdLoading}
						>{`Subscribe for ${formatPrice(price)} a ${
							price.interval
						}`}</Button>
					));
				})}
			</div>
		);
	}

	if (subscription) {
		content = <div className='text-center'>Already subscribed</div>;
	}

	return (
		<Modal
			title='Only for premium users'
			description='Listen to music with Spotify Premium'
			isOpen={subscribeModal.isOpen}
			onChange={onChange}
		>
			{content}
		</Modal>
	);
};

export default SubscribeModal;
