import BrowsePage from "./BrowsePage";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function Body() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <BrowsePage />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}
