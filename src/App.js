import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component";
import './App.css'
import Header from "./components/header/header.component";
import SignInAndSignUp from "./components/sign-in-and-sign-up/sign-in-and-sign-up.component";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signin" element={<SignInAndSignUp />} />
      </Routes>
    </div>
  );
};

export default App;
