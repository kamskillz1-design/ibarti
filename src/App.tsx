import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initLocale } from "./i18n";
import { locationService } from "./services/LocationService";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ListingDetail from "./pages/ListingDetail";
import Profile from "./pages/Profile";
import Trades from "./pages/Trades";
import Admin from "./pages/Admin";

/**
 * On startup: resolve the user's location, then resolve and apply the
 * correct language for that location, before rendering any routed page.
 * This ordering matters — locale resolution depends on the resolved region.
 */
export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      const userId = null; // TODO: replace with real auth state in the Auth slice
      const location = await locationService.resolveCurrentLocation(userId);
      await initLocale(userId, location.stateProvinceId);
      setReady(true);
    }
    void bootstrap();
  }, []);

  if (!ready) {
    return null; // TODO: replace with a proper loading state
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

