import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SprintRoom from "./pages/SprintRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Account Routes */}
        <Route path="/accounts/" element={<Layout />}>
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* Room Routes */}
        <Route path="/room/:id" element={<SprintRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
