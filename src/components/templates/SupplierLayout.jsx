import { Outlet } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import NavigationSupplier from "./NavigationSupplier";

const SupplierLayout = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUserFromToken = () => {
  //     try {
  //       const token = Cookies.get("access_token");
  //       if (token) {
  //         const decoded = jwtDecode(token);
  //         setUser(decoded);
  //       } else {
  //         console.log("Token tidak ditemukan");
  //       }
  //     } catch (error) {
  //       console.error("Gagal mendekode token:", error.message);
  //     }
  //   };

  //   fetchUserFromToken();
  // }, []);
  return (
    <div className="w-full lg:flex">
      <NavigationSupplier />

      <div className="w-full bg-blue-gray-50 lg:ml-80">
        <div className="fixed left-0 right-0 top-0 z-50 hidden items-center justify-between bg-blue-200 px-8 py-4 lg:ml-80 lg:flex">
          {/* <RxHamburgerMenu /> */}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SupplierLayout;
