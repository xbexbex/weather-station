// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC0mlACsMyvumPUeEUC44dom7DAMwAZEAQ',
    authDomain: 'weather-data-ronktor.firebaseapp.com',
    databaseURL: 'https://weather-data-ronktor.firebaseio.com',
    projectId: 'weather-data-ronktor',
    storageBucket: 'weather-data-ronktor.appspot.com',
    messagingSenderId: '1059518516058'
  },
  dateApiKey: 'AIzaSyCuQX3Z9oG-vYtmKUC10njKyuStJfQ-sn4'
};
