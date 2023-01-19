import React, { useContext, useEffect } from "react";
import { StateContext } from "../../contexts/StateContext";
import { useNavigate } from "react-router-dom";
import { signout } from "../../api/api-auth.js";

const Logout = () => {
  const { setUser } = useContext(StateContext);
  const navigate = useNavigate();

  useEffect(() => {
    signout()
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    //eslint-disable-next-line
  }, []);

  return <div></div>;
};

export default Logout;
