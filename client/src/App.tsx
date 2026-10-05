import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import Admin from "./pages/admin.tsx";
import StickyHeader from "./components/stickyHeader";

function App() {
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 10,
          width: "95%",
          maxWidth: 850,
          margin: "10px auto 20px auto",
          zIndex: 100,
        }}
      >
        <StickyHeader />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
