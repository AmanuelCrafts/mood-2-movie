import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-6 text-[#8c20d4] hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
