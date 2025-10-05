export interface Movie {
  id: number;
  name: string;
}

export let movies: Movie[] = [];

movies.push({id: 2, name: "miau"})