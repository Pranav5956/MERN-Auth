import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "../../../Context/UserContext";

function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  }, [userData]);

  return <div className="home">home</div>;
}

export default Home;
