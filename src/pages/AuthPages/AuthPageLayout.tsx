import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-gray-100  dark:bg-gray-800 lg:grid bg-cover-center">
          <div className="relative flex items-center justify-center z-1 hidden">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <div className="flex flex-col items-center max-w-xs ">
              <img src="images/template/login.png?id?1" style={{width:'100%'}}></img>
              <Link to="/" className="block mb-4 mt-[-20px] dark:hidden">
                <img
                  width={231}
                  height={48}
                  src="/app/images/logo/logo.png"
                  alt="Logo"
                />
              </Link>
              <Link to="/" className="block mb-4  mt-[-20px] hidden dark:block">
                <img
                  width={231}
                  height={48}
                  src="/app/images/logo/logo-dark.png"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-black/50 dark:text-white/50 mt-[-15px] flex">
              <img src="/app/images/icons/whatsapp.png" className="w-[15px] h-[15px] mt-[4px] invert-[0.3] dark:invert-[0.7]"/> Alternative Whatsapp API
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
