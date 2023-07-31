import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  imovelId: string;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.imovelId = params.get('id') ?? '';
    });
  }

}
