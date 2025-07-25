
'use client';

import { redirect } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks/hooks';
import Spinner  from '@/components/common/spinner/spinner';

interface Props {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
	const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

	if (isLoading) {
		return (
			<div className='flex justify-center my-8'>
				<Spinner lg />
			</div>
		);
	}

	if (!isAuthenticated) {
		redirect('/auth/login');
	}

	return <>{children}</>;
}