
const admin = require("firebase-admin");
const path = require("path");

try {
    if (admin.getApps().length === 0) {
        const serviceAccountPath =
            process.env.FIREBASE_SERVICE_ACCOUNT ||
            "./src/config/firebase-service-account.json";

        const resolvedPath = path.resolve(serviceAccountPath);
        const serviceAccount = require(resolvedPath);

        const { cert, applicationDefault } = admin;

        admin.initializeApp({
            credential: cert
                ? cert(serviceAccount)
                : applicationDefault()
        });

        console.log("[FIREBASE] Admin SDK initialized successfully");
    } else {
        console.log("[FIREBASE] Admin SDK already initialized");
    }
} catch (error) {
    console.error("[FIREBASE ERROR]", error.message);
}

module.exports = admin;
