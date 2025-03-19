import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { routes } from '../../app.routes';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-markets-page',
  imports: [],
  templateUrl: './markers-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MarkersPageComponent {


}
