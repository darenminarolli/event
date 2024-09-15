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
import { EventProvider } from "./contexts/EventContext";
import CreatedEvents from "./components/CreatedEvents";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/events"
            element={
              <EventProvider>
                <EventsPage />
              </EventProvider>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<RequireAuth allowedRoles={"user"} />}>
            <Route
              path="/profile"
              element={
                <EventProvider>
                  <ProfilePage />
                </EventProvider>
              }
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={"admin"} />}>
            <Route
              path="/admin"
              element={
                <EventProvider>
                  <AdminPage>
                    <CreatedEvents/>
                  </AdminPage>
               </EventProvider>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
