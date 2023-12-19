import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    // console.log(user);
    const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      await fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
          console.log("YES")
          console.log(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

    const logout = () => {
        window.open("http://localhost:5000/auth/logout", "_self");
    };
    return (
        <div className="navbar">
            <span className="logo">
                <Link className="link" to="/">
                    Lama App
                </Link>
            </span>
            {user ? (
                <ul className="list">
                    <li className="listItem">
                        <img
                            src={user.photos[0].value}
                            alt=""
                            className="avatar"
                        />
                    </li>
                    <li className="listItem">{user.displayName}</li>
                    <li className="listItem" onClick={logout}>
                        Logout
                    </li>
                </ul>
            ) : (
                <Link className="link" to="login">
                    Login
                </Link>
            )}
        </div>
    );
};

export default Navbar;
