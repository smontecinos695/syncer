import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PokemonMapperService } from '../pokemon-mapper/pokemon-mapper.service';
import { from, map, mergeMap, Observable, take } from 'rxjs';

export interface PaginatedResult<T> {
  next?: string;
  previous?: string;
  count: number;
  results: T[];
}

export interface PokemonListingItem {
  name: string;
  url: string;
}

export interface Options {
  count?: number;
  concurrency?: number;
}

@Injectable()
export class PokemonApiRepositoryService {
  static readonly API = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    private http: HttpService,
    private pokemonMapper: PokemonMapperService,
  ) {}

  public getPokemons(options: Options = {}): Observable<any> {
    const { count, concurrency = 5 } = options;
    const result = this.getEndpointsList().pipe(
      mergeMap((url) => this.getPokemon(url), concurrency),
    );

    if (count) {
      return result.pipe(take(count));
    }

    return result;
  }

  public getPokemon(url: string) {
    return this.http
      .get(url)
      .pipe(map((response) => this.pokemonMapper.map(response.data)));
  }
  /**
   * This function acts as a producer for requests urls.
   * It emits once per url in the response body
   * @returns Observable<string>
   */
  public getEndpointsList(): Observable<string> {
    return this.http
      .get<PaginatedResult<PokemonListingItem>>(
        PokemonApiRepositoryService.API,
        {
          params: {
            offset: 0,
            limit: -1,
          },
        },
      )
      .pipe(
        mergeMap((response) => {
          const results = response.data.results;
          return from(results.map((x) => x.url));
        }),
      );
  }
}
