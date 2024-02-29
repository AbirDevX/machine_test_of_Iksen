import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-xxl bg-white p-0">
      <ToastContainer />
      <ErrorBoundary fallback={<h2>Some think went wrong..!</h2>}>
        <React.Suspense fallback={<h2>Loading...</h2>}>
          <Navbar />
          {children}
          <Footer />
          <a
            href="#"
            className="btn btn-lg btn-primary btn-lg-square back-to-top"
          >
            <i className="bi bi-arrow-up"></i>
          </a>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Layout;
