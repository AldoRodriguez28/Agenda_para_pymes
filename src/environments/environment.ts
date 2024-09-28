// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false, 
 API_URI: 'https://minegocio.d.seccionamarilla.com.mx/',  
 //API_URI: 'https://localhost:7209/',  
  API_MINEGOCIO_USER:'admin',
  API_MINEGOCIO_PASSWORD:'xui54n8w',
  API_MINEGOCIO_JWT_USER:'admin',
  API_MINEGOCIO_JWT_PASSWORD: 'xui54n8w'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
