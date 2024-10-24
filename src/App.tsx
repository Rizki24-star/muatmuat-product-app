import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AddProductPage from "./pages/AddProduct";
import PokemonPage from "./pages/Pokemon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "add",
        element: <AddProductPage />,
      },
      {
        path: "pokemon",
        element: <PokemonPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
