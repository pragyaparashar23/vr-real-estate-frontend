import { CircleUserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserIcon from "./User";
import { useAuth } from "../../services/auth-provider";

const Header = () => {
  const { user, logout } = useAuth();
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);

  console.log("user", user);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserData(JSON.parse(localStorage.getItem("userDetails")));
  }, [user]);

  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Real Estate Tours
        </Link>
        <nav>
          {userData && token ? (
            <div className="flex items-center gap-4 ">
              {/* <Link to="/" className="text-white mx-2">
                Properties
              </Link> */}
              {userData.role === "buyer" && (
                <Link to="/tours" className="text-white mx-2 text-lg">
                  Tours
                </Link>
              )}
              {userData.role === "agent" && (
                <Link to="/add-property" className="text-white mx-2 text-lg">
                  Add property
                </Link>
              )}

              {/* <CircleUserRound
                color="white"
                size={30}
                className="cursor-pointer"
              /> */}
              <div className="">
                <UserIcon />
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white mx-2">
                Login
              </Link>
              <Link to="/register" className="text-white mx-2">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
