import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {provideRouter} from '@angular/router';
import routerConfig from './app/routes';
import { provideHttpClient } from '@angular/common/http';  // Import HttpClient provider


bootstrapApplication(AppComponent, 
  {
    providers: [
    HttpClientModule,
    provideRouter(routerConfig),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimations()
]
  }
)
  .catch(err => console.error(err));  import { from } from 'rxjs';
import { JwtInterceptor } from './app/guards/jwt.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

