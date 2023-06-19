import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.colentre.autourdemoi',
  appName: 'AutourDeMoi',
  webDir: 'www',
  "plugins": {
    "SplashScreen":{
      "launchShowDuration": 0,
      "launchAutoHide": true
    },
    "CapacitorSQLite": {
      "iosDatabaseLocation": "Library/CapacitorDatabase",
      "iosIsEncryption": false,
      "iosKeychainPrefix": "cap",
      "iosBiometric": {
        "biometricAuth": false,
        "biometricTitle" : "Biometric login for capacitor sqlite"
      },
      "androidIsEncryption": false,
      "androidBiometric": {
        "biometricAuth" : false,
        "biometricTitle" : "Biometric login for capacitor sqlite",
        "biometricSubTitle" : "Log in using your biometric"
      },
      "electronWindowsLocation": "C:\\ProgramData\\CapacitorDatabases",
      "electronMacLocation": "YOUR_VOLUME/CapacitorDatabases",
      "electronLinuxLocation": "Databases"
    }
  },
  bundledWebRuntime: false
};

export default config;
