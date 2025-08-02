// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgotPage } from "./pages/ForgotPage";
import { ResetPage } from "./pages/ResetPage";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermServices } from "./pages/TermServices";
import { FaqPage } from "./pages/FaqPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPage />} />
      <Route path="/reset-password/:token" element={<ResetPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/term-services" element={<TermServices />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
    },
  }
);