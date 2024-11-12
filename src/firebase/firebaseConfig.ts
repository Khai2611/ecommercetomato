// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA-d49DfWfv6dQPGBYfurgF8AtYZ996XWk',
    authDomain: 'tomato-46f02.firebaseapp.com',
    projectId: 'tomato-46f02',
    storageBucket: 'tomato-46f02.firebasestorage.app',
    messagingSenderId: '107103182254',
    appId: '1:107103182254:web:b2aae531233f2429273c3f',
    measurementId: 'G-P0V760VT9Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//auth
export const auth = getAuth(app);
