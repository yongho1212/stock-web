import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './state/store';
import CompanyDetail from './pages/CompanyDetail';
import Main from './pages/Main';
import ErrorPage from './pages/Error';

import KakaoCallback from './components/auth/kakaoAuth/KakaoCallback';


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    
    children: [
      {
        path:"/",
        element:<Main/>
      },
      {
        path: "/companydetail/:id",
        element: <CompanyDetail />,
      },
      {
        path: "/auth/kakao/callback",
        element: <KakaoCallback />,
      }
    ]
  }
])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.Fragment>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
