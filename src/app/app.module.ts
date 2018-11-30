import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// forms
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// form animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// http client support
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// routing
import { AppRoutingModule } from './app-routing.module';

// base component
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './ui-component/app-header/app-header.component';
import { AppContentComponent } from './ui-component/app-content/app-content.component';
import { AppFooterComponent } from './ui-component/app-footer/app-footer.component';
import { KafkaObserverComponent } from './ui-component/kafka-observer/kafka-observer.component';
import { KafkaRestStubService } from './services/kafka-rest-stub.service';
import { KafkaTopicObserverComponent } from './ui-component/kafka-topic-observer/kafka-topic-observer.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AppCarouselComponent } from './ui-component/app-carousel/app-carousel.component';
import { KafkaBrokerObserverComponent } from './ui-component/kafka-broker-observer/kafka-broker-observer.component';
import { KafkaConsumerMgmtComponent } from './ui-component/kafka-consumer-mgmt/kafka-consumer-mgmt.component';
import { AppContextService } from './services/app-context.service';
import { DataService } from './services/data.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FilterPipe } from './utils/filter.pipe';
import { FilterContentPipe } from './utils/filter-content.pipe';
import { AppSlidePanelComponent } from './ui-component/app-slide-panel/app-slide-panel.component';
import { AppCreateConsumerComponent } from './ui-component/app-create-consumer/app-create-consumer.component';
import { AppSubscribeConsumerComponent } from './ui-component/app-subscribe-consumer/app-subscribe-consumer.component';
import { AppLogDisplayComponent } from './ui-component/app-log-display/app-log-display.component';
import { MatButtonModule, MatCheckboxModule, MatSidenavModule } from '@angular/material';
import { HttpLoggingInterceptor } from './interceptors/http-logging-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppContentComponent,
    AppFooterComponent,
    KafkaObserverComponent,
    KafkaTopicObserverComponent,
    AppCarouselComponent,
    KafkaBrokerObserverComponent,
    KafkaConsumerMgmtComponent,
    FilterPipe,
    FilterContentPipe,
    AppSlidePanelComponent,
    AppCreateConsumerComponent,
    AppSubscribeConsumerComponent,
    AppLogDisplayComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    NgxJsonViewerModule,
    NgbModule.forRoot(),
    HttpClientModule,
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule
  ],
  providers: [
    DataService,
    KafkaRestStubService,
    AppContextService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoggingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
