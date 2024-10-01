"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";

export const Navbar = () => {
  const [isGamesHovered, setIsGamesHovered] = useState(false);
  const [isCoursesHovered, setIsCoursesHovered] = useState(false);
  const [isToolsHovered, setIsToolsHovered] = useState(false);

  const navigation = ["Courses", "Games", "News", "Tools"];
  
  const subNavigationCourses = [
    { name: "Investing", link: "/courses/investing" },
    { name: "Retirement Planning", link: "/courses/retirementplanning" },
    { name: "Budgeting", link: "/courses/budgetting" },
  ];

  const subNavigationGames = [
    { name: "PennyWise (Age 5-12)", link: "/games/pennywise" },
    { name: "Money Master (Age 13-18)", link: "/games/teenGames" },
    { name: "Stock Simulation (Age 18+)", link: "/games/stocksimulation" },
  ];

  const subNavigationTools = [
    { name: "Asset Allocator", link: "/tools/asset-allocator" },
    { name: "Savings Calculator", link: "/tools/savings-calculator" },
    { name: "Retirement Planning", link: "/tools/retirement-planning" },
  ];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
            <span>
              <Image
                src="/img/logo.svg"
                width="32"
                alt="N"
                height="32"
                className="w-8"
              />
            </span>
            <span>Finance Flow</span>
          </span>
        </Link>

        {/* Get Started */}
        <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
          <ThemeChanger />
          <div className="hidden mr-3 lg:flex nav__item">
            <Link href="/dashboard" className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
              Dashboard
            </Link>
          </div>
        </div>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="px-2 py-1 text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {open && (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  )}
                  {!open && (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                    />
                  )}
                </svg>
              </Disclosure.Button>

              <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                <>
                  {navigation.map((item, index) => (
                    <Link
                      key={index}
                      href={item !== "Games" && item !== "Courses" && item !== "Tools" ? `/${item.toLowerCase()}` : "#"}
                      className={`w-full px-4 py-2 -ml-4 z-100 text-gray-500 rounded-md dark:text-gray-300 hover:text-[#171717] focus:text-[#171717] focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none`}
                      onClick={(e) => (item === "Games" || item === "Courses" || item === "Tools") && e.preventDefault()} // Prevent routing for dropdown items
                    >
                      {item}
                    </Link>
                  ))}
                  <Link
                    href="/get-started"
                    className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5"
                  >
                    Get Started
                  </Link>
                </>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Main menu */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li
                className="mr-3 nav__item relative"
                key={index}
                onMouseEnter={() => {
                  if (menu === "Games") setIsGamesHovered(true);
                  if (menu === "Courses") setIsCoursesHovered(true);
                  if (menu === "Tools") setIsToolsHovered(true);
                }}
                onMouseLeave={() => {
                  if (menu === "Games") setIsGamesHovered(false);
                  if (menu === "Courses") setIsCoursesHovered(false);
                  if (menu === "Tools") setIsToolsHovered(false);
                }}
              >
                {menu === "Games" ? (
                  <a
                    href="#"
                    className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 cursor-pointer"
                    onClick={(e) => e.preventDefault()} // Prevent routing
                  >
                    {menu}
                  </a>
                ) : menu === "Courses" ? (
                  <a
                    href="#"
                    className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 cursor-pointer"
                    onClick={(e) => e.preventDefault()} // Prevent routing
                  >
                    {menu}
                  </a>
                ) : menu === "Tools" ? (
                  <a
                    href="#"
                    className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 cursor-pointer"
                    onClick={(e) => e.preventDefault()} // Prevent routing
                  >
                    {menu}
                  </a>
                ) : (
                  <Link
                    href={`/${menu.toLowerCase()}`}
                    className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-[#171717] focus:text-[#171717] focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                  >
                    {menu}
                  </Link>
                )}
                {menu === "Games" && isGamesHovered && (
                  <div
                    className="absolute left-0 mt-2 space-y-2 bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 z-50"
                    onMouseEnter={() => setIsGamesHovered(true)}
                    onMouseLeave={() => setIsGamesHovered(false)}
                  >
                    {subNavigationGames.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.link}
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
                {menu === "Courses" && isCoursesHovered && (
                  <div
                    className="absolute left-0 mt-2 space-y-2 bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 z-50"
                    onMouseEnter={() => setIsCoursesHovered(true)}
                    onMouseLeave={() => setIsCoursesHovered(false)}
                  >
                    {subNavigationCourses.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.link}
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
                {menu === "Tools" && isToolsHovered && (
                  <div
                    className="absolute left-0 mt-2 space-y-2 bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 z-50"
                    onMouseEnter={() => setIsToolsHovered(true)}
                    onMouseLeave={() => setIsToolsHovered(false)}
                  >
                    {subNavigationTools.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.link}
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};
