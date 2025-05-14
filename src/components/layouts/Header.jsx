import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className="hover:text-gray-300 transition-colors"
                activeClassName="text-yellow-400"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trad"
                className="hover:text-gray-300 transition-colors"
                activeClassName="text-yellow-400"
              >
                normal react
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rq"
                className="hover:text-gray-300 transition-colors"
                activeClassName="text-yellow-400"
              >
                TanStack query
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/infinite"
                className="hover:text-gray-300 transition-colors"
                activeClassName="text-yellow-400"
              >
                InfiniteScroll
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
