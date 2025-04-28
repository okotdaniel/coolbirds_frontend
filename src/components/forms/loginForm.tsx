'use client';

import { useLogin } from '@/hooks';
import { Spinner } from '../common';
import { Button } from "@/components/ui/button"

export default function  LoginForm() {

    const {
		email,
		password,
		isLoading,
		onChange,
		onSubmit,
	} = useLogin();

	return (

        <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
            
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email </label>
                <input type="email" 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="info@okotdaniel.com" 
                    onChange={onChange}
                    value={email}
                    required 
                />
            </div>

            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" 
                    id="password" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    onChange={onChange}
                    value={password}
                    required 
                />
            </div>
            
            <div>
				<button type='submit'
					className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					disabled={isLoading}
				>
				{isLoading} ? <Spinner sm /> : login 	
				</button>
                {/* <Button>{isLoading} ? <Spinner sm /> : login </Button> */}
			</div>

        </form>
	)};