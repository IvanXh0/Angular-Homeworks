import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAvalibility]',
})
export class AvalibilityDirective implements OnInit {
  @Input() isAvailable: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.changeTextColor();
  }

  changeTextColor() {
    if (this.isAvailable) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    }
  }
}
