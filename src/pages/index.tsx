import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import { clearUser } from '../redux/userSlice';

const Home = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const [user, setUser] = useState(userData ? userData.user : null)

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);


  const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

  }

  const logoutUser = () => {
    dispatch(clearUser());
    router.push('/login');
  }

  return (
    <>
      <Head>
        <title>HOME</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='page'>

        { user != null && (
            user.emailConfrim ? (
                <ul className="user-list">
                  <li>
                    <span>Email: </span>
                    <span>{user.email}</span>
                  </li>
                  <li>
                    <span>Registration Date: </span>
                    <span>{formattedDate(user.createdAt)}</span>
                  </li>
                  <li>
                    <span>E-Mail Confirmation: </span>
                    <span>{user.emailConfrim ? 'Confirmed' : 'Not confirmed'}</span>
                  </li>
                  <li>
                    <button onClick={logoutUser}>Log Out</button>
                  </li>
              </ul>
            ) : 
            (
              <h3>Please confirm your e-mail address</h3>
            )
          
        ) }
       
      </main>
    </>
  )
}


export default Home;