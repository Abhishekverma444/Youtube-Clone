import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { setFlashMessage } from "../../store/flashMsgSlice";
import { setUserData } from '../../store/userSlice'
import { useDispatch } from "react-redux";
import { API_URL } from '../../utils/constants'

const LoginForm = () => {
    const { handleSubmit, register } = useForm();
    const [isLoading, setIsLoading] = useState(false); // Track loading state

    const onSubmit = (data) => {
        console.log(data);
        setIsLoading(true); // Start loading
        loginFrom(data)
    };

    const extractErrorMessage = (htmlString) => {
        const regex = /<pre>(.*?)<\/pre>/s;
        const match = regex.exec(htmlString);
        return match ? match[1] : 'An error occurred';
    };

    const dispatch = useDispatch()
    const loginFrom = async (formData) => {
        try {
            const response = await axios.post(API_URL+'/users/login', formData, {
                withCredentials: true
            });
            // console.log(response);
            console.log('Success:', response.data);
            localStorage.setItem('accessToken', response.data.data.accessToken)
            localStorage.setItem('refreshToken', response.data.data.refreshToken)

            dispatch(
                setUserData({
                    ['userData']: response.data.data.user,
                })
            )
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
            if (error.response && error.response.data) {
                const errorHtml = error.response.data;
                const errorText = extractErrorMessage(errorHtml);
             
                console.log("message",errorText);
                dispatch(
                    setFlashMessage({
                        ['message']: errorText,
                    })
                )
            }
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex flex-col mt-24  w-full text-slate-700 items-center pb-20 justify-center min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500">
            <div className="bg-white bg-opacity-70 rounded-lg p-14 pb-14 mt-10  shadow-lg max-w-lg w-full">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-lg font-semibold">Username</label>
                        <input type="text" {...register("username", { required: true })} id="username" className="input" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-lg font-semibold">Password</label>
                        <input type="password" {...register("password", { required: true })} id="password" className="input" />
                    </div>

                    <button type="submit" disabled={isLoading} className={`${isLoading ? 'opacity-50 cursor-not-allowed' : ''} bg-gradient-to-r from-[#026504] to-green-700 hover:from-green-600 hover:to-green-900 text-white font-bold py-2 rounded-lg mt-2 w-full shadow-md transform transition-transform hover:scale-95 self-center`}>
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
            <Link to="/signup" className="mt-4 text-lg text-white hover:text-[#348831]">Don't have an account? Signup here</Link>
        </div>
    );
};

export default LoginForm;
