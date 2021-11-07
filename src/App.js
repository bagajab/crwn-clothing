import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop/*" element={<Shop />} />
      </Routes>
    </div>
  );
};

const Shop = (props) => {
  let params = useLocation();
  return <h1>{params.pathname}</h1>
};

export default App;
