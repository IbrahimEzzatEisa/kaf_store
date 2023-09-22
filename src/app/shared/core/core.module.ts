import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),


  ],
  exports: [
    CommonModule
  ],
  declarations: [
  ],

})

export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
  ) {
  }
}
