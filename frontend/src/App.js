import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import GetInfo from "./views/GetInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<GetInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
