import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../login/login';
import { TesteLogin } from '../login/teste-login/teste-login';

export interface MapPoint {
  id: number;
  xPercent: number;
  yPercent: number;
  label: string;
  opensLogin: boolean;
  loginComponent: any;
}

@Component({
  selector: 'app-base',
  imports: [NgFor, NgIf, Login, TesteLogin],
  templateUrl: './base.html',
  styleUrl: './base.scss',
})
export class Base implements OnInit {
  showLogin = false;
  isZoomedIn = false;
  zoomedPoint: MapPoint | null = null;

  mapPoints: MapPoint[] = [
    {
      id: 1,
      xPercent: 32,
      yPercent: 28,
      label: 'teste',
      opensLogin: true,
      loginComponent: TesteLogin,
    },
    { id: 2, xPercent: 38, yPercent: 55, label: '1', opensLogin: true, loginComponent: Login },
    { id: 3, xPercent: 52, yPercent: 20, label: '2', opensLogin: true, loginComponent: Login },
    { id: 4, xPercent: 70, yPercent: 65, label: '3', opensLogin: true, loginComponent: Login },
    { id: 5, xPercent: 85, yPercent: 40, label: '4', opensLogin: true, loginComponent: Login },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const label = params.get('label');
      if (label) {
        const point = this.mapPoints.find((p) => p.label === label);
        if (point) {
          this.zoomedPoint = point;
          this.isZoomedIn = true;
          this.showLogin = true;
        }
      }
    });
  }

  get mapTransform(): string {
    return this.isZoomedIn ? 'scale(3)' : 'scale(1)';
  }

  get mapTransformOrigin(): string {
    if (!this.zoomedPoint) return '50% 50%';
    return `${this.zoomedPoint.xPercent}% ${this.zoomedPoint.yPercent}%`;
  }

  onPointClick(point: MapPoint): void {
    this.zoomedPoint = point;
    this.isZoomedIn = true;
    if (point.opensLogin) {
      this.router.navigate([point.label]);
      this.showLogin = true;
    }
  }

  closeLogin(): void {
    this.showLogin = false;
    this.isZoomedIn = false;

    setTimeout(() => {
      this.zoomedPoint = null;
      this.router.navigate(['']);
    }, 650);
  }
}
