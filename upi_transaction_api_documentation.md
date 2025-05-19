
# 💳 UPI Transaction System – API Documentation

## 🧾 Base URL
```
https://digital-wallet-e49p.onrender.com/api/v1
```

---

## 🔐 User Section

### 📌 Register a New User

- **Method:** `POST`  
- **Endpoint:** `/user/register`  
- **Description:** Creates a new user account.

#### Request Body
```json
{
  "name": "mridul tiwari",
  "userId": "mridul",
  "phone": "1234567890",
  "password": "123456789"
}
```

#### Response (Example)
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "userId": "mridul"
  }
}
```

---

### 📌 User Login

- **Method:** `POST`  
- **Endpoint:** `/user/login`  
- **Description:** Authenticates the user with phone number and password.

#### Request Body
```json
{
  "phone": "1234567890",
  "password": "1234567890"
}
```

#### Response (Example)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE"
}
```

---

## 💰 Transaction Section

### 📌 Check Balance

- **Method:** `POST`  
- **Endpoint:** `/transaction/checkBalance`  
- **Description:** Checks the current balance of the authenticated user.

#### Headers
```
Authorization: Bearer <JWT_TOKEN>
```

#### Response (Example)
```json
{
  "success": true,
  "balance": "1500"
}
```

---

### 📌 Transfer Amount

- **Method:** `POST`  
- **Endpoint:** `/transaction/transferAmount`  
- **Description:** Transfers an amount from the sender to the receiver's account.

#### Request Body
```json
{
  "receiver_userId": "1234567890@upi",
  "sender_password": "123456",
  "amount": "500"
}
```

#### Headers
```
Authorization: Bearer <JWT_TOKEN>
```

#### Response (Example)
```json
{
  "success": true,
  "message": "Transfer successful",
  "remaining_balance": "1000"
}
```

---

### 📌 Account Transaction History

- **Method:** `POST`  
- **Endpoint:** `/transaction/accountHistory`  
- **Description:** Retrieves the list of past transactions for the logged-in user.

#### Headers
```
Authorization: Bearer <JWT_TOKEN>
```

#### Response (Example)
```json
{
  "success": true,
  "history": [
    {
      "type": "debit",
      "amount": 500,
      "to": "1234567890@upi",
      "date": "2025-05-18T09:00:00Z"
    }
  ]
}
```

---

## ✅ Notes
- Include the JWT token (received after login) in the `Authorization` header for protected routes.
- Use consistent UPI format for `userId` or `receiver_userId` (e.g., `username@upi`).
- Handle errors gracefully on the client side using status codes and message responses.
