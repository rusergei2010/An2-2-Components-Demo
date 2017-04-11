import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-host-demo',
  templateUrl: './host-demo.component.html',
  styleUrls: ['./host-demo.component.css'],
})
export class HostDemoComponent {
  @HostBinding('class') attrClass = 'headingClass';

  @HostListener('click') clicked() {
    console.log('click event on host element');
  }

  @HostListener('mouseenter', ['$event']) enter(event: Event) {
    console.log('mouseenter event on host element');
  }
  @HostListener('mouseleave',  ['$event']) leave(event: Event) {
    console.log('mouseleave event on host element');
  }
}
