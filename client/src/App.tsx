import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
