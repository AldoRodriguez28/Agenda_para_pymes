import { Component, OnInit } from '@angular/core';
import {GameModel} from "../../models/GameModel";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  game: GameModel = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };
  constructor() { }

  ngOnInit(): void {
  }

}
