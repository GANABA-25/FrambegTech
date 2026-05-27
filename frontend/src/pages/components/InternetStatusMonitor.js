import { useEffect } from "react";

const InternetStatusMonitor = ({ setIsOnline }) => {
  const checkInternetAccess = async () => {
    try {
      const response = await fetch("https://www.google.com", {
        mode: "no-cors",
      });
      if (response.ok || response.type === "opaque") {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkInternetAccess();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const interval = setInterval(checkInternetAccess, 10000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  });

  return null;
};

export default InternetStatusMonitor;
