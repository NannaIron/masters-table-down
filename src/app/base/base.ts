import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../login/login';

export interface MapPoint {
  id: number;
  xPercent: number;
  yPercent: number;
  label: string;
  opensLogin: boolean;
}

@Component({
  selector: 'app-base',
  imports: [NgFor, NgIf, Login],
  templateUrl: './base.html',
  styleUrl: './base.scss',
})
export class Base implements OnInit {
  showLogin = false;
  zoomedPoint: MapPoint | null = null;

  mapPoints: MapPoint[] = [
    { id: 1, xPercent: 32, yPercent: 28, label: 'teste', opensLogin: true },
    { id: 2, xPercent: 38, yPercent: 55, label: '1', opensLogin: true },
    { id: 3, xPercent: 52, yPercent: 20, label: '2', opensLogin: true },
    { id: 4, xPercent: 70, yPercent: 65, label: '3', opensLogin: true },
    { id: 5, xPercent: 85, yPercent: 40, label: '4', opensLogin: true },
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
          this.showLogin = true;
        }
      }
    });
  }

  get mapTransform(): string {
    if (!this.zoomedPoint) return 'scale(1)';
    return 'scale(3)';
  }

  get mapTransformOrigin(): string {
    if (!this.zoomedPoint) return '50% 50%';
    return `${this.zoomedPoint.xPercent}% ${this.zoomedPoint.yPercent}%`;
  }

  onPointClick(point: MapPoint): void {
    this.zoomedPoint = point;
    if (point.opensLogin) {
      this.router.navigate([point.label]);
      this.showLogin = true;
    }
  }

  closeLogin(): void {
    this.showLogin = false;
    this.zoomedPoint = null;

    setTimeout(() => {
      this.router.navigate(['']);
    }, 600);
  }
}
