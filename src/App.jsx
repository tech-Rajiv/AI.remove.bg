import { Route, Routes } from "react-router-dom";
import "./App.css";
import Fotter from "./components/Fotter";
import Header from "./components/Header";
import Home from "./screens/Home";
import CompressImage from "./screens/CompressImage";

function App() {
  return (
    <>
      <div className="">
        <Header />
        <div className="max-w-2xl min-h-screen flex flex-col items-center mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compressimage" element={<CompressImage />} />
          </Routes>
        </div>
        <Fotter />
      </div>
    </>
  );
}

export default App;
