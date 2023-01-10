import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "./pages/pokemonlist/index";
import PokemonDetail from "./pages/pokemonlist/pokemondetail";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />}></Route>
        <Route path="/:name" element={<PokemonDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
