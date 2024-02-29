import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import GustRoute from "./routes/GustRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { loading } = useAuth();
  const routes = createBrowserRouter([
    {
      path: "/sign-in",
      element: (
        <Layout>
          <GustRoute>
            <SignIn />
          </GustRoute>
        </Layout>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <Layout>
          <GustRoute>
            <SignUp />
          </GustRoute>
        </Layout>
      ),
    },
    {
      path: "/home",
      element: (
        <Layout>
          <ProtectedRoute>
            <h2>Home</h2>
          </ProtectedRoute>
        </Layout>
      ),
    },
    {
      path: "/about",
      element: (
        <Layout>
          <h2>About</h2>
        </Layout>
      ),
    },
    {
      path: "/contact",
      element: (
        <Layout>
          <h2>Contact</h2>
        </Layout>
      ),
    },
    {
      path: "/profile",
      element: (
        <Layout>
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        </Layout>
      ),
    },
    {
      path: "*",
      element: (
        <Layout>
          <NotFound />
        </Layout>
      ),
    },
  ]);

  if (loading) {
    return (
      <div
        id="spinner"
        className=" show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main>
      <RouterProvider router={routes} />
    </main>
  );
}

export default App;
