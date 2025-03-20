import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { MapMouseEvent } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import {v4} from 'uuid'


interface Marker {
  id: string;
  mapboxMarker : mapboxgl.Marker;
}


mapboxgl.accessToken = environment.mapboxKey;
@Component({
  selector: 'app-markets-page',
  imports: [],
  templateUrl: './markers-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MarkersPageComponent implements AfterViewInit{
  divElement = viewChild<ElementRef>('map')
  map = signal<mapboxgl.Map|null>(null);

  markers = signal<Marker[]>([])



  async ngAfterViewInit(){
    if (!this.divElement()) return;

  const element = this.divElement()?.nativeElement;

  await new Promise((resolve) => setTimeout(resolve, 80))

  const map = new mapboxgl.Map({
    container: element, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-122.40985, 37.793085], // starting position [lng, lat]
    zoom: 14,});


    // const marker =new  mapboxgl.Marker({
    //   draggable : true
    // })
    //   .setLngLat([-122.40985, 37.793085])
    //   .addTo(map)

    this.mapListener(map)
  }

  mapListener(map : mapboxgl.Map){
    map.on('click', (event) => this.mapClick(event));


    this.map.set(map)
  }

  mapClick(event : MapMouseEvent){
    if (!this.map()) return;

    const map = this.map()!;
    const coords = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapBoxMarker = new mapboxgl.Marker({
      color : color
    }).setLngLat(coords)
      .addTo(map)

    const newMarker : Marker = {
      id : v4(),
      mapboxMarker : mapBoxMarker
    }

    this.markers.set([newMarker, ...this.markers()])
  }


}
