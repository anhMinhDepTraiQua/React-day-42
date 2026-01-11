import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import AuthGuard from "./pages/Auth/authGuard";

import HOCDemo from "./pages/HOCDemo";
import RenderPropsDemo from "./pages/RenderPropsDemo";

function App() {
  return (
    <BrowserRouter basename="/React-day-42">
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />

        <Route
          path="/hoc-demo"
          element={
            <AuthGuard>
              <HOCDemo />
            </AuthGuard>
          }
        />

        <Route
          path="/render-props-demo"
          element={
            <AuthGuard>
              <RenderPropsDemo />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
