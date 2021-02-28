import { animate, state, style, transition, trigger } from '@angular/animations'
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('isOpenClosed', [
      state(
        'true',
        style({
          width: '7%',
          backgroundColor: '#081c29',
        })
      ),
      state(
        'false',
        style({
          width: '30px',
        })
      ),
      state(
        'clicked',
        style({
          width: '50%',
          backgroundColor: '#081c29',
        })
      ),
      transition('true <=> false, * <=> clicked', [animate('0.3s')]),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  @Output() public ouputText: EventEmitter<string> = new EventEmitter<string>()
  @ViewChild('searchInput') searchElement!: ElementRef<HTMLInputElement>

  public searchIcon = faSearch
  public buttonState = 'false'

  constructor() {}

  ngOnInit(): void {}

  public textOutput(event: any): void {
    this.ouputText.emit(event.target.value)
  }

  public mouseStateHover(state: string): void {
    if (this.buttonState !== 'clicked') {
      this.buttonState = state
    }
  }

  public mouseStateClicked(): void {
    if (this.buttonState === 'clicked') {
      this.searchElement.nativeElement.blur()
      this.ouputText.emit('')
      this.buttonState = 'false'
    } else {
      this.buttonState = 'clicked'
    }
  }

  public onAnimationEvent(event: any): void {
    if (this.buttonState === 'clicked') {
      this.searchElement.nativeElement.focus()
    }
  }
}
