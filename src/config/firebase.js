const admin = require("firebase-admin");

// Option A: Using a service account JSON file from Firebase Console
// (Download your service account JSON from Firebase Console -> Project Settings -> Service Accounts, 
// place it in your backend folder, and name it 'serviceAccountKey.json')
try {
    const serviceAccount = require("../config/serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    console.log("[FIREBASE] Admin SDK initialized successfully");
} catch (error) {
    console.error("[FIREBASE ERROR] Failed to initialize Firebase Admin. Make sure serviceAccountKey.json exists.", error.message);
}

module.exports = admin;