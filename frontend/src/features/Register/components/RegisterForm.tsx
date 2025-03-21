import "../form.css";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../services/api-client";
import { useState } from "react";
import schema, { RegisterFormData } from "../helpers/validation";

const RegisterForm = () => {
	const [error, setError] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
		reset,
	} = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

	const onSubmit = (data: FieldValues, e: any) => {
		e.preventDefault();
		apiClient
			.post("/", data)
			.then(() => {
				setError("");
				reset();
			})
			.catch((error) => setError(error.message));
	};

	return (
		<>
			<div className='large-screen'>
				This app is unavailable for large screens. Please use a mobile device.
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='form' role='form'>
				<p className='title'>Register</p>
				{error && <p className='err'>{error}</p>}
				<p className='message'>Signup now and get full access to our app.</p>
				{isSubmitSuccessful && <p className='message'>Signup Successful</p>}
				<div className='form-group'>
					<label htmlFor='username' className='label'>
						Username
					</label>
					<input
						{...register("username")}
						id='username'
						type='text'
						className='form-input'
					/>
					{errors.username && <p className='err'>{errors.username.message}</p>}
				</div>
				<div className='form-group'>
					<label htmlFor='email' className='label'>
						Email
					</label>
					<input
						{...register("email")}
						id='email'
						type='email'
						className='form-input'
					/>
					{errors.email && <p className='err'>{errors.email.message}</p>}
				</div>
				<div className='form-group'>
					<label htmlFor='password' className='label'>
						Password
					</label>
					<input
						{...register("password")}
						id='password'
						type='password'
						className='form-input'
						data-testid='password'
					/>
					{errors.password && <p className='err'>{errors.password.message}</p>}
				</div>
				<div className='form-group'>
					<label htmlFor='passwordConfirm' className='label'>
						Confirm Password
					</label>
					<input
						{...register("passwordConfirm")}
						id='passwordConfirm'
						type='password'
						className='form-input'
						data-testid='passwordConfirm'
					/>
					{errors.passwordConfirm && (
						<p className='err'>{errors.passwordConfirm.message}</p>
					)}
				</div>
				<button type='submit'>Submit</button>
				<p className='signin'>
					Already have an account? <a href=''>Login</a>
				</p>
			</form>
		</>
	);
};

export default RegisterForm;
