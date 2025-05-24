import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import User from "./layouts/User";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import { HelmetProvider } from "react-helmet-async";
import PrivateRoute from './components/PrivateRoute'; // thêm dòng này

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = User;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const isAdminRoute = route.path.startsWith('/Admin');

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isAdminRoute ? (
                    <PrivateRoute>
                      <Layout><Page /></Layout>
                    </PrivateRoute>
                  ) : (
                    <Layout><Page /></Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
