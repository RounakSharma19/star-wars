export type TCharacterDetail = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  photo: string;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
  created: string;
  edited: string;
  url: string;
};

export type TCharacterPages = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: TCharacter[];
};

export type TCharacter = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
  created: Date;
  edited: Date;
  url: string;
};

export enum Gender {
  Female = "female",
  Male = "male",
  NA = "n/a",
}

export type TVehicle = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: Array<string>;
  films: Array<string>;
  created: Date;
  edited: Date;
  url: string;
};

export type TSpecie = {
  name: string;
  classification: string;
  designation: Designation;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: null | string;
  language: string;
  people: Array<string>;
  films: Array<string>;
  created: Date;
  edited: Date;
  url: string;
};

export enum Designation {
  Reptilian = "reptilian",
  Sentient = "sentient",
}

export type TStarship = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: Array<string>;
  films: Array<string>;
  created: Date;
  edited: Date;
  url: string;
};

export type ErrorState = unknown | null;

export type TPlanet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: Array<string>;
  films: Array<string>;
  created: Date;
  edited: Date;
  url: string;
};

export type TFilm = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  characters: Array<string>;
  planets: Array<string>;
  starships: Array<string>;
  vehicles: Array<string>;
  species: Array<string>;
  created: Date;
  edited: Date;
  url: string;
};
