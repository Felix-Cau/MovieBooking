import './style.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';
import ManageBookings from './Components/ManageBookings';
import Admin from './Components/Admin';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import { PageContext } from './Data/PageContext';
import { useState, useEffect } from 'react';

function Layout() {
  const [activePage, setActivePage] = useState<string>('Home');
  const location = useLocation();

  useEffect(() => {
    const pathToPage: Record<string, string>= {
      '/': 'Home',
      '/aboutme': 'About me',
      '/aboutsite': 'About this site',
    };

    setActivePage(pathToPage[location.pathname] || 'Home');
  }, [location.pathname]);

  return (
    <>
      <PageContext.Provider value={{ activePage, setActivePage }}>
        <Header />
      </PageContext.Provider>
      <Outlet />
      <Footer />
    </>
  );
}

const routerDetails = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div>Whops! Something went wrong...</div>,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/managebookings",
        element: <ManageBookings />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routerDetails}></RouterProvider>
    </>
  );
}

export default App;
