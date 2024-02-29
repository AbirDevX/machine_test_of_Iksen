import { default as JsCookie, default as jsCookie } from "js-cookie";
import { useEffect, useState } from "react";
import instance from "../axios_instance/instance";
import {
  setAccessToken,
  setIsAuthenticate,
  setUser,
} from "../redux/slice/authSlice";
import { useAppDispatch } from "./hooks";

function useAuth() {
  const [loading, setLoading] = useState(false);
  const disPatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      try {
        const accessToken = jsCookie.get("user_accessToken");
        // console.log(accessToken)
        const { data, status } = await instance.get("/verify", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (status !== 200) throw new Error("throw error..!");
        disPatch(setUser(data.user));
        disPatch(setAccessToken(data.accessToken));
        disPatch(setIsAuthenticate(true));
        JsCookie.set("user_accessToken", data?.accessToken, {
          // domain: "localhost",
          secure: true,
          expires: 1,
        });
      } catch (error) {
        disPatch(setUser(null));
        disPatch(setAccessToken(""));
        disPatch(setIsAuthenticate(false));
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { loading };
}

export { useAuth };

