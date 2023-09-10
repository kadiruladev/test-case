import Head from 'next/head';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const backendURL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await axios.post(`${backendURL}/auth/Login`, data);

      if (response.status === 201) {
        const userData = response.data.data;
        dispatch(setUser(userData));

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login Successful. You are redirected to the homepage.',
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (error: any) {
      console.log("error", error);

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response.data.response.message,
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <>
      <Head>
        <title>LOG IN</title>
      </Head>
      <main className="page">
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <h4 className='form__title'>LOG IN</h4>
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
          <button type="submit">Sign In</button>

          <p className='form__desc'>
            {"Don't you have an account? "}
            <Link href="/register" className='form__redirect'>Register Now</Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default Login;
