import { useEffect } from "react";
import { useParams, useNavigate} from "react-router";
import { useGlobalData } from "./globalVar";

const SetToken = ({ type }: { type: boolean }) => {
  const { token } = useParams();
  const params = new URLSearchParams(window.location.search);
  const typeToken = params.get('type'); // puede ser 'password', null, etc.// ✅ 'password' o null
  const navigate = useNavigate();
  const { setUserToken } = useGlobalData();

  useEffect(() => {
    if (type && token) {
      localStorage.setItem('token', token);
      setUserToken(token);
      if(typeToken=="password"){
        navigate("/app/profile?action=password");
        return;
      }
      navigate("/app/instances");
    }
  }, [type, token]);

  useEffect(() => {
    if (!type) {
      localStorage.removeItem('token');
      navigate("/app/signin");
    }
  }, [type]);

  return <p>Processing token...</p>;
};

export default SetToken;
