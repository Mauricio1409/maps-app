import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import mapboxgl from 'mapbox-gl';
import { DecimalPipe, JsonPipe } from '@angular/common';


mapboxgl.accessToken = environment.mapboxKey;




@Component({
  selector: 'app-fullscreen-map-page',
  imports: [
    DecimalPipe,
    JsonPipe
  ],
  templateUrl: './fullscreen-map-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    div {
      width: 100vw;
      height: calc( 100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }

  `,
})
export default class FullscreenMapPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map')

  zoom = signal(14);

  coordinates = signal({ lat: 40, lng: -74.5 });



  map = signal<mapboxgl.Map|null>(null);

  zoomEffect = effect(() => {
    if(!this.map()) return;

    this.map()?.setZoom(this.zoom());
  })

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    const element = this.divElement()?.nativeElement;

    const {lat , lng} = this.coordinates();

    await new Promise((resolve) => setTimeout(resolve, 80))

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    this.mapListener(map);
  }

  mapListener(map : mapboxgl.Map) {

    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    })

    map.on('moveend', (event) => {
      const center = event.target.getCenter();
      this.coordinates.set(center);
    })

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }
 }
