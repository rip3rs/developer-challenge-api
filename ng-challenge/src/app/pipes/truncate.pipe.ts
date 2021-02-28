import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(
    text: string,
    showAll: boolean = false,
    length: number = 120,
    suffix: string = '...'
  ): string {
    let outputValue = ''

    if (text) {
      if (showAll) {
        outputValue = text
      } else {
        outputValue = text.split(' ').splice(0, length).join(' ') + suffix
      }
    }

    return outputValue
  }
}
