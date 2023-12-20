import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../util/firebase'; // Import firebaseApp from your firebase.js file
import { ImCross } from 'react-icons/im';

function SignInSignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const authInstance = auth; // Use auth method from firebaseApp

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      authInstance,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);

        emailRef.current.value = '';
        passwordRef.current.value = '';

        setIsModalVisible(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      authInstance,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);

        emailRef.current.value = '';
        passwordRef.current.value = '';

        setIsModalVisible(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {isModalVisible && (
        <div className='w-screen h-screen bg-[#00000080] z-[20] fixed top-0 left-0 flex items-center justify-center text-white'>
          <div className='p-2 md:p-0 absolute '>
            <div className=' bg-[#00094B] p-2 md:p-10 rounded-xl w-full max-w-[650px]'>
              <section className='p-2 w-full flex flex-col gap-5 justify-center items-center min-w-[350px] '>
                <i onClick={closeModal} className=' close-model absolute top-6 right-10 cursor-pointer'>
                  <ImCross />
                </i>
                <h1 className=' text-2xl uppercase '>Login</h1>
                <div className=' flex w-full flex-col'>
                  <label htmlFor='email'>Email</label>
                  <input ref={emailRef} type='text' name='email' className='bg-transparent border outline-none p-2 rounded-md ' />
                </div>
                <div className=' flex pb-2 w-full flex-col '>
                  <label htmlFor='password'>Password</label>
                  <input ref={passwordRef} type='password' name='password' className='outline-none p-2 rounded-md bg-transparent border ' />
                </div>
                <button className=' border w-full justify-center text-center rounded-md bg-[#2221] p-2 flex items-center gap-2' onClick={signIn}>
                  Sign in
                </button>

                <div className='flex items-center justify-center gap-2 ml-[-50px]  '>
                  <hr className=' h-[1px] w-[100px] flex  ' />
                  <p>OR</p>
                  <hr className='w-[100px] h-[1px] ml-0 ' />
                </div>
                <button className=' border w-full justify-center items-center rounded-md bg-[#2221] p-2 flex gap-2 '>
                  The Movie Trailer home
                </button>
                <div className='flex gap-3'>
                  Don't have an account?
                  <button onClick={register} className=' hover:text-blue-500 '>
                    Sign up
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignInSignUp;
