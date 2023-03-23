import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';

// layouts
import RootLayout from './layouts/RootLayout';

// pages
import HomePage from './pages/home/HomePage';
import LeaderBoardPage from './pages/leaderboard/LeaderBoardPage';
import NotFoundPage from './pages/notfound/NotFoundPage';


const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path="" element={<RootLayout />}>

      <Route path="" element={<HomePage />} />

      <Route path="leaderboard" element={<LeaderBoardPage />} />
      
      <Route path="*" element={<NotFoundPage />} />

    </Route> 

  )

);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;