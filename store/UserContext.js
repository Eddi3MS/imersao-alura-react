import React, { useEffect, useState } from "react";

const UserContext = React.createContext({
  user: "",
  setUser: () => {},
  error: "",
  setError: () => {},
  info: {},
  setInfo: () => {},
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (user === "") return;

    const identifier = setTimeout(() => {
      const url = `https://api.github.com/users/${user}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setError("");
            setData(data);
          }
        });
    }, 700);

    return () => {
      clearTimeout(identifier);
    };
  }, [user]);

  const setData = ({ name, avatar_url, blog, location }) => {
    setInfo({
      name,
      avatar: avatar_url,
      blog,
      location,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        error: error,
        setError: setError,
        info: info,
        setInfo: setInfo,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
