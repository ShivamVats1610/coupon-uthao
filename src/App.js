import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./js/components/Layout";
import SearchContentContainer from "./js/containers/SearchContentContainer";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchContentContainer />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
