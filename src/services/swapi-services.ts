import { TCharacterPages, TSpecie, TPlanet, TCharacterDetail } from "../types";

const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

if (!baseUrl) {
  throw new Error("endpoint is not defined");
}

export const getAllCharactersPages = async () => {
  let characterPages: TCharacterPages[] = [];
  let nextUrl = `${baseUrl}/people/?page=1`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    characterPages = [...characterPages, data];
    nextUrl = data.next;
  }
  return characterPages;
};

export const getAllSpecies = async () => {
  let species: TSpecie[] = [];
  let nextUrl = `${baseUrl}/species/?page=1`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    species = [...species, ...data.results];
    nextUrl = data.next;
  }
  return species;
};

export const getAllPlanets = async () => {
  let planets: TPlanet[] = [];
  let nextUrl = `${baseUrl}/planets/?page=1`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    planets = [...planets, ...data.results];
    nextUrl = data.next;
  }
  return planets;
};

export const getCharacterById = async (
  id: string
): Promise<TCharacterDetail> => {
  const res = await fetch(`${baseUrl}/people/${id}`);
  return res.json();
};

export const getPlanetById = async (id: string): Promise<TPlanet> => {
  const res = await fetch(`${baseUrl}/planets/${id}`);
  return res.json();
};

export const getPlanetByUrl = async (url: string): Promise<TPlanet> => {
  const res = await fetch(`${url}`);
  return res.json();
};
