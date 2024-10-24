import React from "react";
import { Provider } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { store } from "../redux/stores";

const MainLayout = () => {
  return (
    <Provider store={store}>
      <div>
        <header className="flex flex-col">
          <nav className="bg-black h-[100px] text-white flex items-center px-4">
            <Link to="/" className="text-white font-bold text-2xl">
              Product app
            </Link>
          </nav>
        </header>
        <main
          style={{ height: "calc(100vh - 100px)" }}
          className="overflow-auto mb-14 flex flex-col items-center "
        >
          <Outlet />
        </main>
        <footer className="text-white bg-black text-center py-2">
          <p>Product app</p>
          <span>Technical test PT AZLogistik</span>
        </footer>
      </div>
    </Provider>
  );
};

export default MainLayout;
