import { useEffect } from "react";
import { useQuery } from "react-query";
import { apiKey, tmdbURL } from "../../services/api";

export async function fetchMovieById({ queryKey}) {
  // eslint-disable-next-line no-unused-vars
  const [_key, { query: id }] = queryKey;

  const res = await fetch(
    `${tmdbURL}/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits,release_dates,images,recommendations`
  );

  // error catching
  if (!res.ok) {
    throw new Error(`Request failed with status code ${res.status}`);
  }

  const data = await res.json();

  return data;
}

export default function useMovieQuery(query) {
  useEffect(() => {window.scrollTo(0, 0)}, [query])
    return useQuery(["movie", {query}], fetchMovieById);
}