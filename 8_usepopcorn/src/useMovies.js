import { useEffect, useState } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "97d61671";

  useEffect(() => {
    //callback?.();

    // Esse AbortController é um recurso do browser que permite cancelar uma requisição
    // Nesse caso, é usado para SOMENTE exibir o resultado da última requisição
    // Se o usuário digitar algo e a requisição ainda não foi finalizada, ele cancela a requisição anterior.
    // Veja o uso do controller abaixo para saber como utilizar, é bem padrão.
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query},`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          console.error("An error occurred while fetching the movies!");
          return;
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found!");
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name === "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
