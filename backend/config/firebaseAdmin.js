import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Production: Parse the JSON string from environment variable
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
    // Local development:
    // Using a dynamic approach or keeping your existing import inside a try/catch prevents build crashes
    try {
        const module = await import("./serviceAccountKey.json", { assert: { type: "json" } });
        serviceAccount = module.default;
    } catch (e) {
        throw new Error("Firebase service account is missing. Set FIREBASE_SERVICE_ACCOUNT environment variable or provide serviceAccountKey.json locally.");
    }
}

initializeApp({
    credential: cert(serviceAccount)
});

export const adminAuth = getAuth();