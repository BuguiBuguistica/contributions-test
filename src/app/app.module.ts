import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgDatepickerModule } from 'ng2-datepicker';

// App Components
import { AppComponent } from './app.component';
import { MyContributionsComponent } from './my-contributions/my-contributions.component';
import { ContributionCardComponent } from './my-contributions/components/contribution-card/contribution-card.component';
import { RangeSliderComponent } from './share/range-slider/range-slider.component';
import { TabsComponent } from './share/tabs/tabs.component';
import { ContributionFormComponent } from './my-contributions/components/contribution-form/contribution-form.component';
import { NewContributionComponent } from './my-contributions/components/new-contribution/new-contribution.component';

// Layout components
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';

const appRoutes: Routes = [
  { path: '', component: MyContributionsComponent }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MyContributionsComponent,
    ContributionCardComponent,
    RangeSliderComponent,
    TabsComponent,
    ContributionFormComponent,
    NewContributionComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgDatepickerModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
