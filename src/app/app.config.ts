import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import routes from '@app/app.routes';
import TokenInterceptor from '@interceptors/token.interceptor';
import provideCore from '@modules/core';
import { provideQuillConfig } from 'ngx-quill/config';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

registerLocaleData(localeEs);
export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: appearance },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideHttpClient(withXhr(), withInterceptors([TokenInterceptor])),
    provideNativeDateAdapter(),
    provideCore(),
    provideQuillConfig({
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['blockquote', 'link', 'image'],
          ['clean'],
        ],
      },
    }),
  ],
};
export default appConfig;
