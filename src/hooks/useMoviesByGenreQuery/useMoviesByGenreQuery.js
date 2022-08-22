import { useInfiniteQuery } from "react-query";
import { apiKey, tmdbURL } from "../../services/api";
import useGenresQuery from "../useGenresQuery/useGenresQuery";

export async function fetchMoviesByGenre({ queryKey, pageParam = 1 }) {
  // eslint-disable-next-line no-unused-vars
  const [_key, { genre }] = queryKey;

  const res = await fetch(
    `${tmdbURL}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&with_genres=${genre}&page=${pageParam}`
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

export default function useMoviesByGenreQuery(genreName) {
  const { data: genres, isSuccess: fetchGenresSuccess } = useGenresQuery();

  console.log(genreName)

  const genre =
    fetchGenresSuccess &&
    genres.filter((genre) => genreName === genre.name)[0].id;

  return useInfiniteQuery(["genre", { genre }], fetchMoviesByGenre, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.nextPage < lastPage.totalPages) {
        return lastPage.nextPage;
      }
      return undefined;
    },
  });
}