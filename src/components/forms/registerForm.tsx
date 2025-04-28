'use client';

import useRegister from '@/hooks/use-register';
import { Spinner } from '../common';

export default function RegisterForm() {
    // Destructuring from useRegister hook
    const {
        first_name,
        last_name,
        email,
        password,
        re_password,
        isLoading,
        onChange,
        onSubmit,
    } = useRegister();

    return (
        <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
            {/* First Name */}
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                <input 
                    type="text" 
                    id="first_name" 
                    className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Daniel" 
                    onChange={onChange}
                    value={first_name}
                    required 
                />
            </div>

            {/* Last Name */}
            <div className="mb-5">
                <label className="form-input block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                <input 
                    type="text" 
                    id="last_name" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Perterson" 
                    onChange={onChange}
                    value={last_name}
                    required 
                />
            </div>

            {/* Email */}
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="name@lusaviai.com" 
                    onChange={onChange}
                    value={email}
                    required 
                />
            </div>

            {/* Password */}
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    onChange={onChange}
                    value={password}
                    required 
                />
            </div>

            {/* Re-password */}
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re password</label>
                <input 
                    type="password" 
                    id="re_password" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    onChange={onChange}
                    value={re_password}
                    required 
                />
            </div>

            {/* Submit Button */}
            <div>
                <button 
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner sm /> : "Register"}
                </button>
            </div>
        </form>
    );
}
