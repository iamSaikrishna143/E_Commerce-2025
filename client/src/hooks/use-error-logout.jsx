import { useDispatch } from "react-redux";
import useToast from "./use-toast";
import { setUserLogout } from "../redux/slices/authSlice";

const useErrorLogout = () => {
  const dispath = useDispatch();
  const { toast } = useToast();
  const handleLogoutError = (error, otherTitle = "error occured") => {
    if (error.response?.status === 401) {
      dispath(setUserLogout());
      toast({
        title: "Session Expired",
        description: "Please Login again to continue",
        variant: "destructive",
      });
    } else {
      toast({
        title: otherTitle,
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return handleLogoutError;
};
export default useErrorLogout;
