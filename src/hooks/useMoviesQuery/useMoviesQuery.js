import { useInfiniteQuery } from "react-query";
import { apiKey, tmdbURL } from "../../services/api";

export async function fetchMovies({ queryKey, pageParam = 1 }) {
  // eslint-disable-next-line no-unused-vars
  const [_key, { query: path }] = queryKey;

  const res = await fetch(
    `${tmdbURL}/movie/${path}/?api_key=${apiKey}&page=${pageParam}`
  );

  // error catching
  if (!res.ok) {
    throw new Error(`Request failed with status code ${res.status}`);
  }

  const data = await res.json();

  const results = data.results;
  const nextPage = pageParam + 1;
  const totalPages = data["total_pages"];

  return { results, nextPage, totalPages };
}

export default function useMoviesQuery(query) {
  return useInfiniteQuery(["movies", { query }], fetchMovies, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.nextPage < lastPage.totalPages) {
        return lastPage.nextPage;
      }
      return undefined;
    },
  });
}