import "react-toastify/dist/ReactToastify.css";
import { Pokemon } from "./pages/Pokemon";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pokemon/>}/>
    </Routes>
  )
}

export default App
