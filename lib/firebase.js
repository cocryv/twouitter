import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

// In order to make it work u should put here your project config

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "twouitter-2af53.firebaseapp.com",
    projectId: "twouitter-2af53",
    storageBucket: "twouitter-2af53.appspot.com",
    messagingSenderId: "944348808090",
    appId: "1:944348808090:web:b31102b093d4b6911cf023"
    };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);