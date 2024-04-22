import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appNotEnoughBalance]',
  standalone: true
})
export class NotEnoughBalanceDirective {
  @Input() set appNotEnoughBalance(hasAccess: boolean) {
    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

}
