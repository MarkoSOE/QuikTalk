/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Signup = () => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: ''
    })
    const { firstname, lastname, email, password, confirmpassword } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        console.log(formData)
        const newUser = {
            firstname,
            lastname,
            email,
            password,
            confirmpassword
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(newUser)
            await axios.post('/signup', body, config)
            .then(res => {
                console.log(res.data)
                window.location.href = '/'
            })
        } catch (error) {      
            console.log(error.res.data);      
        }
    }
    return (
        <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Signup for an account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        If you have an account: {' '}
                        <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </a>
                    </p>
                </div>
            <form className="mt-8 space-y-6" onSubmit={onSubmit} method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="firstname" className="sr-only">
                                First Name
                                </label>
                                <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="First Name"
                                onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="sr-only">
                                Last Name
                                </label>
                                <input
                                id="lastname"
                                name="lastname"
                                type="text"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Last Name"
                                onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
                                Email
                                </label>
                                <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email"
                                onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                Password
                                </label>
                                <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                                onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmpassword" className="sr-only">
                                Confirm Password
                                </label>
                                <input
                                id="confirmpassword"
                                name="confirmpassword"
                                type="password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Confirm Password"
                                onChange={onChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                </span>
                                Sign up
                            </button>
                        </div>
                </form>    
            </div>
        </div>
    </>
)}
export default Signup