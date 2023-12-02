'use client';

import Modal from '@/components/Modal';
import { useState, useEffect } from 'react';

const ModalProvider = (): React.ReactNode => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<Modal title='test' description='test desc' isOpen onChange={() => {}}>
				Test Children
			</Modal>
		</>
	);
};

export default ModalProvider;
