import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Production: Parse the JSON string from environment variable
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
    // Local development:
    // Using a dynamic approach or keeping your existing import inside a try/catch prevents build crashes
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const localKeyPath = path.join(__dirname, "serviceAccountKey.json");

        const fileData = fs.readFileSync(localKeyPath, "utf-8");
        serviceAccount = JSON.parse(fileData);
    } catch (e) {
        throw new Error("Firebase service account is missing. Ensure serviceAccountKey.json exists in the config folder or set FIREBASE_SERVICE_ACCOUNT.");
    }
}

initializeApp({
    credential: cert(serviceAccount)
});

export const adminAuth = getAuth();