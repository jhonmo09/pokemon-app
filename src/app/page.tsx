"use client";

import styles from "./styles.module.scss";
import useFetchPokemon from "@/hooks/use-fetch-pokemon";

const HomePage = () => {
  const { pokemonData, loading, error } = useFetchPokemon("ditto");
  console.log(pokemonData);
  const { name, image, types, height, weight } = pokemonData || {};

  return (
    <article className={styles.card}>
      {loading && (
        <div className={styles.loading}>
          <span>Cargando...</span>
        </div>
      )}
      {error ? (
        <div className={styles.error}>
          <span>Error: {error}</span>
        </div>
      ) : (
        <>
          <h1 className={styles.card__title}>{name}</h1>
          <div className={styles.card__inner}>
            <figure className={styles.card__image}>
              <img src={image} alt={name} />
            </figure>
            <div className={styles.card__content}>
              <ul>
                <li>Height: {height ? height / 10 : 0} m</li>
                <li>Weight: {weight ? weight / 10 : 0} kg</li>
                <li>Types: {types?.join(", ")}</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default HomePage;
