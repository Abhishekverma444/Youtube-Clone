import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header, Sidebar, LoginForm, SignupForm, Users } from './Components/index'
import { EmptyPage, HomePage, VideoListingPage, VideoDetailsPage } from './pages/index'


const appRouter = createBrowserRouter([{
  path: "/",
  element: <HomePage />,
  children: [
    {
      path: "/",
      element: <VideoListingPage />,
    },
    {
      path: "/videos/:videoId",
      element: <VideoDetailsPage />,
    },
    {
      path: "/signup",
      element: <SignupForm />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    // {
    //   path: "demo",
    //   element: <>
    //     <Demo />
    //     <Demo2/>
    //   </>
    // }
  ]
}])

function App() {

  return (
    <div className="w-full h-full">
      <div >
        <RouterProvider router={appRouter} >
          <Header />
        </RouterProvider>
      </div>
    </div>
  )
}

export default App
