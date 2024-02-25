import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed";
import SearchResults from "./components/SearchResults";
import VideoDetails from "./components/VideoDetails";
import Header from "./components/Header";
import { AppContextProvider } from "./context/AppContext";
import FeedVideo from "./components/FeedVideo";

import Channel from "./components/Channel";
import VoiceSearch from "./components/VoiceSearch";

function App() {
  const [isListening, setIsListening] = useState(false);

  return (
    <div>
      <AppContextProvider>
        <BrowserRouter>
          {isListening && (
            <VoiceSearch
              setIsListening={setIsListening}
              isListening={isListening}
            />
          )}
          <Header setIsListening={setIsListening} />

          <Routes>
            <Route path="/" element={<Feed />}>
              <Route index element={<FeedVideo />} />
              <Route path="/search/:searchQuery" element={<SearchResults />} />
              <Route path="/video/:id" element={<VideoDetails />} />
              <Route path="/channel/:channelid" element={<Channel />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
