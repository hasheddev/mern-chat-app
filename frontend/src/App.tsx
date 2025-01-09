import { BrowserRouter, Route, Routes } from "react-router-dom";

import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import { useUserContext } from "./contexts/UserContext";

function App() {

    const {isLoggedIn} = useUserContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/auth" element={<Auth />} />
            {isLoggedIn && <Route path="/chat" element={<Chat/>} />}
            <Route path="*" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
