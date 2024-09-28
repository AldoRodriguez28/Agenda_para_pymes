import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GameModel} from "../models/GameModel";

@Injectable({
  providedIn: 'root'
})
export class MiNegocioService {

  API_URI = environment.API_URI;

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<GameModel []>(`${this.API_URI}/games`);
  }
}
