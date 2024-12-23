import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus',
  standalone: true // standalone pipe для использования в любом компоненте
})
export class TaskStatusPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'не выполнена':
        return '❌ Not Completed';
      case 'готово':
        return '✅ Completed';
      default:
        return '⚠️ Unknown Status';
    }
  }
}
