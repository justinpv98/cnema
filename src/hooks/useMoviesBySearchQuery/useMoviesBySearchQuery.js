import { useInfiniteQuery } from "react-query";
import { apiKey, tmdbURL } from "../../services/api";

export async function fetchMoviesBySearch({ queryKey, pageParam = 1 }) {
  // eslint-disable-next-line no-unused-vars
  const [_key, { query }] = queryKey;

  const res = await fetch(
    `${tmdbURL}/search/movie?api_key=${apiKey}&query=${query}&page=${pageParam}`
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

export default function useMoviesByGenreQuery(query) {
  return useInfiniteQuery(["search", { query }], fetchMoviesBySearch, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.nextPage < lastPage.totalPages) {
        return lastPage.nextPage;
      }
      return undefined;
    },
  });
}