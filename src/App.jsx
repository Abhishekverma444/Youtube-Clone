import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header, Sidebar, LoginForm, SignupForm, Users } from './Components/index'
import {
  EmptyPage, HomePage, VideoListingPage, MyChannelPage, MyChannelVideoPage,
  MyChannelPlaylistPage,
  MyChannelTweetPage,
  MyChannelChannelSubscribedPage, VideoDetailsPage,
  ChannelPage, ChannelPlaylistVideoPage
} from './pages/index'


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
    {
      path: '/channel',
      element: <ChannelPage />,
    },
    {
      path: '/channel/playlist/:playlistId',
      element: <ChannelPlaylistVideoPage />,
    },
    {
      path: '/myChannel',
      element: <MyChannelPage />,
      children: [
        {
          path: '/myChannel',
          element: <MyChannelVideoPage />
        },
        {
          path: '/myChannel/playlist',
          element:<MyChannelPlaylistPage/>
        },
        {
          path: '/myChannel/tweet',
          element:<MyChannelTweetPage/>
        },
        {
          path: '/myChannel/subscribed',
          element:<MyChannelChannelSubscribedPage/>
        }
      ]
    }
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
