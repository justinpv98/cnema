import { useQuery } from "react-query";
import { apiKey, tmdbURL } from "../../services/api";

export async function fetchGenres() {
  const res = await fetch(`${tmdbURL}/genre/movie/list?api_key=${apiKey}`);
  if (!res.ok) {
    throw new Error(`Request failed with status code ${res.status}`);
  }
  const { genres } = await res.json();
  return genres;
}

export default function useGenresQuery() {
  return useQuery("genres", fetchGenres);
}