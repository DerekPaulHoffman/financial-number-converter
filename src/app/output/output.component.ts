import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss',
})
export class OutputComponent implements OnInit {
  fullNumber: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.fullNumber = params['value'];
    });
  }

  redirectToInput() {
    this.router.navigate(['/input']);
  }
}
