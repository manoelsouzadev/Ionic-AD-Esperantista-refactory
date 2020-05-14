// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  guid: require('guid'),
  BASE_URL: 'https://heroku-host-api.herokuapp.com',
  //BASE_URL: '/api',
  firebaseConfig: {
    apiKey: "AIzaSyDTVfsZZaCSc5XmtWmPTKKsaIgHgz_0rNk",
    authDomain: "appesperantista.firebaseapp.com",
    databaseURL: "https://appesperantista.firebaseio.com",
    projectId: "appesperantista",
    storageBucket: "gs://appesperantista.appspot.com",
    messagingSenderId: "1035201652289",
    appId: "1:1035201652289:web:188701f89ceef8f44648c0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
