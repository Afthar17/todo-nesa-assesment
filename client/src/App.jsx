import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

export default function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader size={50} className="animate-spin" />
        <p className="text-xl font-semibold mt-3 animate-bounce transition duration-300">
          Loading...
        </p>
      </div>
    );
  }
  return (
    <>
      <AppRouter />
    </>
  );
}
