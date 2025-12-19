import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AllNotes from "./pages/AllNotes";
import ArchivedNotes from "./pages/ArchivedNotes";
import NoteContent from "./components/NoteContent";

const App = () => {
  return (
    <div className="container" id="app">
      <Sidebar />
      <main className="main">
        <Header />
        <Routes>
          <Route path="/" element={<AllNotes />} />
          <Route path="/archived" element={<ArchivedNotes />} />
        </Routes>
        <NoteContent />
      </main>
    </div>
  );
};

export default App;
