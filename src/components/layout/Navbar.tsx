/* eslint-disable no-constant-condition */
import React, { useEffect, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

import Button from "@/components/common/Button";

import { useCurrentQuery } from "@/common/API/services/auth";
import { useAppDispatch, useTypedSelector } from "@/common/store";
import { logout, selectCurrentUser } from "@/common/store/authSlice";
import { cn } from "@/common/utils/cn";

interface NavbarMenuElement {
  name: string;
  url: string;
  isActive: boolean;
  isMobile?: boolean;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const user = useTypedSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useCurrentQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [navbarMenu, setNavbarMenu] = useState<NavbarMenuElement[]>([
    { name: "Home", url: "/", isActive: true },
    { name: "Portfolio", url: "/portfolio", isActive: false },
    { name: "Transactions", url: "/transactions", isActive: false },
  ]);

  useEffect(() => {
    const newNavbarMenu = navbarMenu.map((element) => {
      if (element.url === location.pathname) {
        element.isActive = true;
      } else {
        element.isActive = false;
      }

      return element;
    });

    setNavbarMenu(newNavbarMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <nav className="w-full">
      <div className="hidden justify-between p-7 lg:flex">
        <div className="flex flex-1 items-center justify-start">
          <div className="ml-5" id="navbar-default">
            <ul className="flex font-normal">
              {navbarMenu
                .filter(({ isMobile }) => !isMobile)
                .map((element) => (
                  <li key={element.name}>
                    <NavLink
                      to={element.url}
                      className={cn(
                        "block bg-transparent py-2 pl-3 pr-4 font-semibold",
                        element.isActive ? "text-[#4d3c64]" : "text-gray-500 hover:text-[#4d3c64]",
                      )}
                      aria-current="page"
                    >
                      {element.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mx-5 flex flex-1 items-center justify-end">
          {user ? (
            <div className="flex items-center">
              <div>{user.email}</div>
              <IoExitOutline className="ml-4 h-7 w-7 cursor-pointer" onClick={() => dispatch(logout())} />
            </div>
          ) : (
            <Button type="button" to="/login">
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
