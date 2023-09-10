import Head from 'next/head'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Swal from 'sweetalert2';

const Register = () => {

  const { control, handleSubmit, formState: { errors } } = useForm();

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onSubmit = async (data: any) => {
    const backendURL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await axios.post(`${backendURL}/auth/Register`, {
        email: data.email,
        password: data.password,
        referanceCode: '',
        emailConfrimToken: ''
      });

      if(response.status == 201){

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Registration successful. Please complete the activation process sent to your e-mail.',
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => {
          router.push('/login');
        }, 2000);

      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response.data.message,
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <>
      <Head>
        <title>REGISTER</title>
      </Head>
      <main className="page">
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <h4 className='form__title'>REGISTER</h4>
          <div className='form__item'>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    {...field}
                  />
                  {errors.email && <p className='error'>{(errors.email as any).message}</p>}
                </>
              )}
            />
          </div>
          <div className='form__item'>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <>
                  <input
                    type="password"
                    placeholder="Your Password"
                    {...field}
                  />
                  {errors.password && <p className='error'>{(errors.password as any).message}</p>}
                </>
              )}
            />
          </div>
          <button type="submit">Register</button>

          <p className='form__desc'>You have an account? 
            <Link href="/login" className='form__redirect'>Sign In</Link>
          </p>

        </form>
      </main>
    </>
  )
}


export default Register;
