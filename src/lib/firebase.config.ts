// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC6kZjuPdoAP-SyQ2ZhNmBSSjx3z5HxGaQ",
	authDomain: "sistema-de-adopcion-de-macotas.firebaseapp.com",
	projectId: "sistema-de-adopcion-de-macotas",
	storageBucket: "sistema-de-adopcion-de-macotas.appspot.com",
	messagingSenderId: "93242662912",
	appId: "1:93242662912:web:eb21cc53b90aa379ccb8e5",
	measurementId: "G-E4Y39VNVNE",
}

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const analytics = getAnalytics(app)

export { app, storage, db, analytics }
