import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./dashboard/components/layout/Layout";
import Ads from "./dashboard/pages/Ads/Ads";
import AllBookings from "./dashboard/pages/AllBookings/AllBookings";
import BookPage from "./dashboard/pages/BookPage/BookPage";
import Dashboard from "./dashboard/pages/dash/Dashboard";
import ItemDetailsPage from "./dashboard/pages/ItemDetailsPage/ItemDetailsPage";
import ItemPage from "./dashboard/pages/ItemPage/ItemPage";

import Notifications from "./dashboard/pages/notifications/Notifications";
import Payment from "./dashboard/pages/Payment/Payment";
import UserBooking from "./dashboard/pages/UserBooking/UserBooking";
import Users from "./dashboard/pages/users/Users";
import VendorItems from "./dashboard/pages/VendorItems/VendorItems";
import Vendors from "./dashboard/pages/vendors/Vendors";
import WithDraw from "./dashboard/pages/Withdraws/Withdraws";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="vendorItems" element={<VendorItems />} />
          <Route path="userBooking" element={<UserBooking />} />
          <Route path="bookPage" element={<BookPage />} />
          <Route path="itemPage" element={<ItemPage />} />
          <Route path="ads" element={<Ads />} />
          <Route path="allBookings" element={<AllBookings />} />
          <Route path="itemDetailsPage" element={<ItemDetailsPage />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="payment" element={<Payment />} />
          <Route path="withdraws" element={<WithDraw />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
