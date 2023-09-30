import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Form = HTMLFormElement & {
  pokemon: HTMLInputElement;
};

export const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState({
    id: 0,
    name: "",
    image: "",
    gif: "",
  });
  const [hasWon, setHasWon] = useState(false);

  const pokemonData = (num: number) => {
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

  const handleSubmit = (event: React.FormEvent<Form>) => {
    event.preventDefault();

    const { pokemon } = event.currentTarget;

    if (pokemon?.value?.toLowerCase() === pokemonList?.name?.toLowerCase()) {
      setHasWon(true);
      toast.success("You won!");
    } else {
      toast.error("Wrong answer!");
      pokemon.value = "";
    }
  };

  const randomPokemon = () => {
    const min = 1;
    const max = 151;
    const num = Math.floor(Math.random() * (max - min + min) + min);
    pokemonData(num);
  };

  const playAgain = () => {
    setHasWon(false);
    randomPokemon();
  };

  useEffect(() => {
    randomPokemon();
  }, []);

  return (
    <div className="h-screen bg-hero-pattern bg-no-repeat bg-cover flex items-center justify-center bg-center p-3">
      <div className="bg-black/80 rounded-xl min-h-[548px] max-w-2xl max-h-2xl w-full h-fit flex items-center justify-center flex-col p-5">
        <img
          className={`max-h-[350px] max-w-[350px] w-full h-full select-none pointer-events-none pixelated ${
            hasWon ? "p-10" : "brightness-0 invert"
          }`}
          src={hasWon ? pokemonList.gif : pokemonList.image}
          alt="pokemon"
        />
        {hasWon ? (
          <button onClick={playAgain} className="nes-btn is-success" autoFocus>
            Play again
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-fit flex flex-col justify-center"
          >
            <input
              type="text"
              id="name_field"
              className="nes-input outline-none"
              name="pokemon"
              autoFocus
              autoComplete="off"
            />
            <button className="nes-btn">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};
