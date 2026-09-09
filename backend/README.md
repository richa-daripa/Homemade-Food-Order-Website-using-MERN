## Installation for backendend
```bash
npm install express mongoose cors dotenv
npm i --save-dev nodemon
npm install multer
npm install stripe
npm install firebase-admin
```

### Foods API

```js
GET    /api/foods
GET    /api/foods/:id
POST   /api/foods
PUT    /api/foods/:id
DELETE /api/foods/:id
```

### Cart API

```js
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:id
```

### Order API

```js
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PATCH  /api/orders/:id/status
```
### Payment Status API
```js
GET     /api/orders/payment-status/:sessionId
```
### Review API

```js
POST   /api/reviews
GET    /api/reviews/:foodId
```

### Applying auth middleware

- After applying auth middleware,req.user.uid, req.user.email, req.user.name are available

- The flow should be:

- Firebase creates/authenticates the user.
- Get the Firebase ID token.
- Send the token to your backend (/sync-user).
- Backend verifies the token and either creates the user or updates lastLogin.

### To test the Stripe Webhook locally follow the below steps

- Terminal 1 — Backend => ```npm run dev```
- Terminal 2 — Stripe webhook listener => ```stripe listen --forward-to localhost:5000/api/stripe-webhook```
- Terminal 3 — Frontend => ```npm run dev```

###
- Stripe Session = what the customer paid for.
- Webhook = confirmation of that payment and creation of the final order.