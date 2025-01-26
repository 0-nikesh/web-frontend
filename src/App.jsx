// import { lazy, Suspense } from "react";

// // import { InfoProvider } from "./context/InfoContext.jsx";

// const Login = lazy(() => import("./core/public/login"));
// const Home = lazy(() => import("./core/public/home"));


// function App() {
//   const publicRoutes = [
//     {
//       path: "/",
//       element: (
//         <Suspense>
//           <Home />
//         </Suspense>
//       ),
//       // errorElement: <>error</>,s
//     },
//     {
//       path: "/login",
//       element: (
//         <Suspense>
//           <Login />
//         </Suspense>
//       ),
//       errorElement: <>error</>,
//     },
//   ];
// }

// export default App;

// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Dashboard from "./core/public/dashboard";
// import Login from "./core/public/login";
// import Register from "./core/public/register";
// import MyMapComponent from "./core/public/map";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/check" element={<MyMapComponent />} />
//         {/* Add other routes here */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Admin from "./core/private/admin"; // Admin panel
import PrivateRoute from "./core/private/privateroute"; // PrivateRoute component
import Dashboard from "./core/public/dashboard";
import Forbidden from "./core/public/forbidden"; // 403 Page
import ForgotPassword from "./core/public/forgot-password";
import Login from "./core/public/login";
import MyMapComponent from "./core/public/map";
import Register from "./core/public/register";
import ResetPassword from "./core/public/reset-password";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check" element={<MyMapComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Private Routes */}

        <Route
          path="/admin"
          element={
            <PrivateRoute isAdminRequired={true}>
              <Admin />
            </PrivateRoute>
          }
        />

        {/* Error Route */}
        <Route path="/403" element={<Forbidden />} />
      </Routes>
    </Router>
  );
}

export default App;

