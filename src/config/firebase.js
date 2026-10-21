
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

try {
    // Get the Firebase Admin SDK app module
    const { getApps, initializeApp, cert } = require("firebase-admin/app");
    const { getMessaging } = require("firebase-admin/messaging");

    if (getApps().length === 0) {
        const serviceAccountPath =
            process.env.FIREBASE_SERVICE_ACCOUNT ||
            path.join(__dirname, "firebase-service-account.json");

        const resolvedPath = path.resolve(serviceAccountPath);

        if (!fs.existsSync(resolvedPath)) {
            throw new Error(
                `Firebase service account file not found: ${resolvedPath}`
            );
        }

        const serviceAccount = JSON.parse(
            fs.readFileSync(resolvedPath, "utf8")
        );

        initializeApp({
            credential: cert(serviceAccount)
        });

        console.log("[FIREBASE] Admin SDK initialized successfully");
    } else {
        console.log("[FIREBASE] Admin SDK already initialized");
    }

    admin.messaging = () => getMessaging();

    console.log(
        "[FIREBASE] Messaging available:",
        typeof admin.messaging
    );
} catch (error) {
    console.error("[FIREBASE ERROR]", error.message);
}

module.exports = admin;
