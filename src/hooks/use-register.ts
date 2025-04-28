import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/lib/redux/slices/authApiSlice';

import {toast} from 'react-toastify'



export default function useRegister() {
	const router = useRouter();
	const [register, { isLoading }] = useRegisterMutation();

	const fields = {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		re_password: '',
	}
	
	const [formData, setFormData] = useState(fields);

	const { first_name, last_name, email, password, re_password } = formData;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		register({ first_name, last_name, email, password, re_password })
			.unwrap()
			.then(() => {
				toast.success('Please check email to verify account');
				router.push('/auth/login');
			})
			.catch(() => {
				toast.error('Failed to register account');
			});
	};

	return {
		first_name, last_name, email, password, re_password, isLoading, onChange, onSubmit,
	};
}