"use client";

type PokemonData = {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
};

import { useEffect, useState } from "react";

const useFetchPokemon = (pokemonName: string) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) {
        throw new Error("Falló la carga de la respuesta");
      }
      const data = await response.json();
      setPokemonData({
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(
          (type: { type: { name: string } }) => type.type.name
        ),
        height: data.height,
        weight: data.weight,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error cargando la data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [pokemonName]);

  return { pokemonData, loading, error };
};

export default useFetchPokemon;
