
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-naughty-dark p-6 text-center">
      <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-6">Page Not Found</h2>
      <p className="text-gray-300 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved to another location.
      </p>
      <Button asChild size="lg" className="bg-naughty-purple hover:bg-naughty-purpleDark text-white">
        <Link to="/">
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
