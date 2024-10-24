import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PokemonPage = () => {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String>("");

  const getPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const pokemons = await response.json();
      setPokemons(pokemons.results);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-wrap gap-4 mt-4 mx-4">
      {pokemons.map((pokemon, i) => (
        <div key={i} className="border border-black p-4 flex flex-col gap-2">
          <div> {pokemon.name}</div>
          <Link
            to={pokemon.url}
            className="p-2 bg-black text-white text-center"
          >
            Visit
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonPage;
