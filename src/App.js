import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchScreen from "./components/SearchScreen";
import Header from "./components/Header";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route for the root path */}
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
