import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import MainLayout from "./layouts/MainLayout";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFoundPage";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<RequireAuth allowedRoles={"user"} />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route></Route>
          </Route>
          {/* <Route element={<RequireAuth allowedRoles={"admin"} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
