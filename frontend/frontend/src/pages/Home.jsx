import React from 'react';
import { useSelector } from 'react-redux'; // Correct import
import Nav from '../Component/Nav';       // Correct import (match folder name)

function Home() {
    // State reading is correctly structured
    const userData = useSelector(state => state.user.userData); 

    return (
        // JSX structure is correct
        <div className='w-[100%] overflow-hidden'>
            <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
                
                {/* Prop passing to Nav is correct */}
                <Nav userData={userData} /> 
                
                <main className='pt-[70px] p-4 text-center'>
                    <h1 className='text-3xl font-bold'>Welcome to Virtual Courses!</h1>
                    {userData ? (
                        <p className='mt-2 text-xl'>Hello, {userData.name}. Your role is {userData.role}.</p>
                    ) : (
                        <p className='mt-2 text-xl'>Please Log In or Sign Up to get started.</p>
                    )}
                </main>

            </div>
        </div>
    );
}

export default Home;