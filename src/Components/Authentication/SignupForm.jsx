import React,{ useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import axios from "axios";
import { setFlashMessage } from "../../store/flashMsgSlice";
import { useDispatch } from "react-redux";

const SignupForm = () => {
    const { handleSubmit, register } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true); // start loading
        signupForm(data)
    }


    const dispatch = useDispatch()
    const signupForm = async (formData) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('fullname', formData.fullname);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('username', formData.username);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('avatar', formData.avatar[0]);
            formDataToSend.append('coverImage', formData.coverImage[0]);
            
            const response = await axios.post('http://localhost:8000/api/v1/users/register', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
              // Include credentials in the request
            });
            // console.log('Success:', response.data);
            dispatch(
                setFlashMessage({
                    ['message']: response.data.message,
                })
            )
            setTimeout(()=>{
                dispatch(
                  setFlashMessage({
                    ['message']: null,
                  })
                )
              }, 3000)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="flex flex-col w-full mt-24 text-slate-700 items-center pb-10 justify-center min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500">
            <div className="bg-white bg-opacity-70 rounded-lg p-10 mt-10 shadow-lg max-w-lg w-full">
                <h2 className="text-3xl font-bold mb-6 text-center">Signup</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="fullname" className="text-lg font-semibold">Fullname</label>
                        <input type="text" {...register("fullname", { required: true })} id="fullname" className="input" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-lg font-semibold">Username</label>
                        <input type="text" {...register("username", { required: true })} id="username" className="input" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-lg font-semibold">Email</label>
                        <input type="email" {...register("email", { required: true })} id="email" className="input" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-lg font-semibold">Password</label>
                        <input type="password" {...register("password", { required: true })} id="password" className="input" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="avatar" className="text-lg font-semibold">Avatar</label>
                        <input type="file" {...register("avatar", { required: true, maxLength: 1 })} id="avatar" className="input" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="coverImage" className="text-lg font-semibold">Cover Image</label>
                        <input type="file" {...register("coverImage", { maxLength: 1 })} id="coverImage" className="input" />
                    </div>

                    <button type="submit" disabled={isLoading} className={`${isLoading ? 'opacity-50 cursor-not-allowed' : ''} bg-gradient-to-r from-[#026504] to-green-700 hover:from-green-600 hover:to-green-900 text-white font-bold py-2  rounded-lg w-full shadow-md transform transition-transform hover:scale-95 self-center`}>{isLoading? 'Signing up...' : 'Singup'}</button>
                </form>
            </div>
            <Link to="/login" className="mt-4 text-lg text-white hover:text-[#348831]">Already have an account? Login here</Link>
        </div>
    );
};

export default SignupForm;
