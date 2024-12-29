import { lazy, Suspense } from "react";
// import { InfoProvider } from "./context/InfoContext.jsx";

const Login = lazy(() => import("./core/public/login"));

function App() {
  const publicRoutes = [
    {
      path: "/",
      element: (
        <Suspense>
          <Home />
        </Suspense>
      ),
      // errorElement: <>error</>,
    },
    {
      path: "/login",
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
      errorElement: <>error</>,
    },
  ];
}

export default App;
