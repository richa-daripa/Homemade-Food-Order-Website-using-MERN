### Installation for frontend
```bash
npm install bootstrap react-bootstrap
npm install react-router-dom
npm install react-hook-form
npm install firebase
npm install react-confetti-boom
npm install react-icons
npm install lucide-react
```

- Since we're doing an optimistic update for user cart, if the backend fails, UI will currently say the item is gone while MongoDB still contains it. So to prevent that we need to store the previous state for rollback in the UI

### Optimistic update model
```text
                CONTEXT
                   ↑
                   │
            UI changes immediately
                   │
                 CLICK
                   │
                   ↓
                  API
                   │
                   ↓
                DATABASE
```

- If the user clicks + twice very quickly the POST/add will be send twice Both requests could read: cartDetails[foodId] = 1 and both try to save: cartDetails[foodId] = 2 so instead of: 1 → 2 → 3 it will be saved as 2. This is a race condition. Therefote we need MongoDB's atomic updates using $inc and $unset

### Checkout Architecture based on cod and card

```text     
                    User Click Place Order
                           │
                           ↓
                     POST /placeOrder
                           │
              ┌────────────┴────────────┐
              │                         │
             COD                       CARD
              │                         │
              ▼                         ▼
       Create Order             Create CheckoutSession
       status Pending                    │
              │                          ▼
         Clear Cart                Create Stripe Session
              │                           │
              ▼                           │
            /order                        ▼
                                  Redirect to Stripe
                                         │
                               ┌─────────┴─────────┐
                               │                   │
                     Cancel/Back/Fail             Pay
                               │                   │
                               ▼                   ▼
                             /cart         Stripe Webhook
                                                   │
                                                   ▼
                                      Verify webhook signature
                                                   │
                                                   ▼
                                          Create Order
                                          status = Paid
                                                   │
                                                   ▼
                                             Clear Cart
                                                   │
                                                   ▼
                                          PaymentVerification
                                                   │
                                            verifyPayment
                                                   │
                                                   ↓
                                                /order
```

### Frontend flow for displaying payment

```text

User pays
   ↓
Stripe
   ↓
success_url
   ↓
/paymentSuccess?session_id=xxx
   ↓
Frontend calls backend
   ↓
GET /order/payment-status/xxx
   ↓
Backend checks Stripe session + your Order
   ↓
┌─────────────────────────────┐
│                             │
Order exists              Order doesn't exist
│                             │
↓                             ↓
Success                  Processing / Retry
```