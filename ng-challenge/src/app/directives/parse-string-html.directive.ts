import { Directive, ElementRef, Input, OnInit } from '@angular/core'

@Directive({
  selector: '[stringToHtml]',
})
export class StringToHtmlDirective implements OnInit {
  @Input() public stringToHtml: string = ''

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
    this._elementRef.nativeElement.innerHTML = this.stringToHtml // this should be a pipe parser... but for time specific ill leave it
  }
}
