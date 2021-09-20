import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTopics } from "./store/topics";

import Header from "./components/Header";
import SideBar from "./components/SideBar";
import ImageViewer from "./components/ImageViewer";
import "./styles/App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopics());
  });

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Header />
          <SideBar />
          <ImageViewer />
        </div>
      </header>
    </div>
  );
}

export default App;
