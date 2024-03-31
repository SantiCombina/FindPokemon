import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Form = HTMLFormElement & {
  pokemon: HTMLInputElement;
};

interface Pokemon {
  id: number;
  name: string;
  image: string;
  gif: string;
}

export const Pokemon = () => {
  const [lastPokemon, setLastPokemon] = useState<Pokemon | undefined>(
    undefined
  );
  const [pokemonList, setPokemonList] = useState<Pokemon | undefined>(
    undefined
  );
  const [hasWon, setHasWon] = useState(false);

  const pokemonData = () => {
    const min = 1;
    const max = 151;
    const num = Math.floor(Math.random() * (max - min + min) + min);

    fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
      .then((res) => res.json())
      .then((data) =>
        setPokemonList({
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          gif: data.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
        })
      );
  };
  console.log(pokemonList?.name);

  const handleSubmit = (event: React.FormEvent<Form>) => {
    event.preventDefault();

    const { pokemon } = event.currentTarget;

    if (pokemon?.value?.toLowerCase() === pokemonList?.name?.toLowerCase()) {
      setHasWon(true);
      toast.success("You won!");
      setLastPokemon(pokemonList);
    } else {
      toast.error("Wrong answer!");
      pokemon.value = "";
    }
  };

  const playAgain = () => {
    setHasWon(false);
    const img = document.getElementById("poketest");
    if (img) {
      img.style.visibility = "hidden";
    }
    pokemonData();
  };

  useEffect(() => {
    pokemonData();
  }, []);

  useEffect(() => {
    if (lastPokemon) {
      setTimeout(() => {
        setLastPokemon(undefined);
        const img = document.getElementById("poketest");
        if (img) {
          img.style.visibility = "visible";
        }
      }, 1000);
    }
  }, [pokemonList]);

  return (
    <div
      className="h-screen bg-hero-pattern bg-no-repeat bg-cover flex items-center justify-between flex-col bg-center p-3"
      style={{ boxShadow: "inset 0 100vh 0 rgba(0, 0, 0, .1)" }}
    >
      <span />
      <div className="bg-black/80 rounded-2xl min-h-[548px] max-w-2xl max-h-2xl w-full h-fit flex items-center justify-center flex-col p-5">
        {lastPokemon ? (
          <>
            <img
              className={`max-h-[350px] max-w-[350px] w-full h-full select-none pointer-events-none pixelated`}
              src={lastPokemon.gif}
              alt="pokemon"
            />
            {hasWon && (
              <button
                onClick={playAgain}
                className="nes-btn is-success"
                autoFocus
              >
                Play again
              </button>
            )}
          </>
        ) : (
          <>
            <img
              className={`max-h-[350px] max-w-[350px] w-full h-full select-none animation-pulse pointer-events-none pixelated from:opacity-0 to:opacity-1 from:scale-0 to:scale-100 duration-100 transition-all brightness-0 invert`}
              src={pokemonList?.image}
              alt="pokemon"
              id="poketest"
              style={{ visibility: "visible" }}
            />
            <form
              onSubmit={handleSubmit}
              className="w-ful flex flex-col items-center justify-center"
            >
              <input
                type="text"
                id="name_field"
                className="nes-input w-full outline-none"
                name="pokemon"
                autoFocus
                autoComplete="off"
              />
              <button className="nes-btn">Submit</button>
            </form>
          </>
        )}
      </div>
      <footer className="text-lime-400 flex w-full justify-center text-sm font-light -mb-1 font-sans">
        Developed by Santiago Combina
      </footer>
    </div>
  );
};
