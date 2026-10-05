# DroneTV AI — REST API Documentation

Complete technical documentation for the **DroneTV AI Enquiry Management REST API**, detailing endpoints, request schemas, validation rules, status codes, and sample responses.

---

## 1. Overview & Base Configuration

- **Base URL:** `http://localhost:3011/api/enquiries`
- **Content-Type:** `application/json`
- **Authentication:** Public (Enquiry creation) / Admin Dashboard access (Read, Update, Delete)
- **Security & Sanitization:** All incoming string payloads are trimmed, validated, and sanitized against Cross-Site Scripting (XSS) before database persistence.

---

## 2. Data Model (`Enquiry` Schema)

| Field       | Type       | Required | Allowed Values / Constraints                        | Default        | Description                                  |
| :---------- | :--------- | :------- | :-------------------------------------------------- | :------------- | :------------------------------------------- |
| `_id`       | `ObjectId` | Auto     | 24-character hex string                             | Auto-generated | Unique MongoDB document identifier           |
| `name`      | `String`   | Yes      | Min: 2 chars, Max: 100 chars                        | —              | Full name of the user                        |
| `email`     | `String`   | Yes      | Valid email format (indexed)                        | —              | Contact email address                        |
| `phone`     | `String`   | Yes      | Valid 10–15 digit phone number                      | —              | Contact phone number                         |
| `userType`  | `String`   | Yes      | `"Student"`, `"Customer"`, `"Other"`                | `"Student"`    | Category of the enquiring user               |
| `interest`  | `String`   | Yes      | Max: 200 chars (XSS sanitized)                      | —              | Specific course or drone service of interest |
| `message`   | `String`   | Yes      | Max: 1000 chars (XSS sanitized)                     | —              | Detailed enquiry message or question         |
| `status`    | `String`   | No       | `"New"`, `"Contacted"`, `"In Progress"`, `"Closed"` | `"New"`        | Current workflow status managed by Admin     |
| `createdAt` | `Date`     | Auto     | ISO 8601 Date String                                | `Date.now`     | Timestamp when the enquiry was created       |
| `updatedAt` | `Date`     | Auto     | ISO 8601 Date String                                | `Date.now`     | Timestamp when the enquiry was last updated  |

---

## 3. Endpoints Reference

### 3.1 Create a New Enquiry

Submits a new student or customer enquiry from the Home page form or Chatbot flow.

- **Endpoint:** `POST /api/enquiries/`
- **Headers:** `Content-Type: application/json`

#### Request Body

```json
{
  "name": "Arindam Mukherjee",
  "email": "a.mukherjee@disastermanagement.gov.in",
  "phone": "+91 9433011223",
  "userType": "Customer",
  "interest": "Search & Rescue UAV Deployment",
  "message": "We need thermal hexacopters for flood relief operations."
}
```

#### Success Response (`201 Created`)

```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {
    "_id": "67013f9b8c2a4e1234567890",
    "name": "Arindam Mukherjee",
    "email": "a.mukherjee@disastermanagement.gov.in",
    "phone": "+91 9433011223",
    "userType": "Customer",
    "interest": "Search &amp; Rescue UAV Deployment",
    "message": "We need thermal hexacopters for flood relief operations.",
    "status": "New",
    "createdAt": "2026-10-05T13:10:00.000Z",
    "updatedAt": "2026-10-05T13:10:00.000Z",
    "__v": 0
  }
}
```

#### Error Response (`400 Bad Request`)

```json
{
  "success": false,
  "message": "Please fill in all required fields or provide a valid email address."
}
```

---

### 3.2 Get All Enquiries

Retrieves a list of all submitted enquiries sorted by newest first (`createdAt: -1`). Supports optional query parameters for filtering.

- **Endpoint:** `GET /api/enquiries/`
- **Optional Query Parameters:**
  - `userType` — Filter by `"Student"`, `"Customer"`, or `"Other"`
  - `status` — Filter by `"New"`, `"Contacted"`, `"In Progress"`, or `"Closed"`
  - `search` — Search keyword matching `name`, `email`, or `interest`

#### Example Request

```http
GET http://localhost:3011/api/enquiries/
```

#### Success Response (`200 OK`)

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "67013f9b8c2a4e1234567890",
      "name": "Arindam Mukherjee",
      "email": "a.mukherjee@disastermanagement.gov.in",
      "phone": "+91 9433011223",
      "userType": "Customer",
      "interest": "Search &amp; Rescue UAV Deployment",
      "message": "We need thermal hexacopters for flood relief operations.",
      "status": "New",
      "createdAt": "2026-10-05T13:10:00.000Z",
      "updatedAt": "2026-10-05T13:10:00.000Z"
    },
    {
      "_id": "67013f108c2a4e1234567889",
      "name": "Priya Nair",
      "email": "p.nair@infrasteelcorp.com",
      "phone": "+91 9876501234",
      "userType": "Student",
      "interest": "DGCA Remote Pilot Certificate",
      "message": "Interested in weekend batch dates.",
      "status": "Contacted",
      "createdAt": "2026-10-05T12:45:00.000Z",
      "updatedAt": "2026-10-05T12:55:00.000Z"
    }
  ]
}
```

---

### 3.3 Get a Single Enquiry by ID

Fetches the full details of a specific enquiry using its MongoDB `_id`.

- **Endpoint:** `GET /api/enquiries/:id`
- **URL Parameter:** `id` (String — valid MongoDB ObjectId)

#### Example Request

```http
GET http://localhost:3011/api/enquiries/67013f9b8c2a4e1234567890
```

#### Success Response (`200 OK`)

```json
{
  "success": true,
  "data": {
    "_id": "67013f9b8c2a4e1234567890",
    "name": "Arindam Mukherjee",
    "email": "a.mukherjee@disastermanagement.gov.in",
    "phone": "+91 9433011223",
    "userType": "Customer",
    "interest": "Search &amp; Rescue UAV Deployment",
    "message": "We need thermal hexacopters for flood relief operations.",
    "status": "New",
    "createdAt": "2026-10-05T13:10:00.000Z",
    "updatedAt": "2026-10-05T13:10:00.000Z"
  }
}
```

#### Error Response (`404 Not Found`)

```json
{
  "success": false,
  "message": "Enquiry not found"
}
```

---

### 3.4 Update Enquiry Status

Updates the workflow `status` (or other fields) of an existing enquiry from the Admin Dashboard modal.

- **Endpoint:** `PUT /api/enquiries/:id`
- **URL Parameter:** `id` (String — valid MongoDB ObjectId)
- **Headers:** `Content-Type: application/json`

#### Request Body

```json
{
  "status": "In Progress"
}
```

#### Success Response (`200 OK`)

```json
{
  "success": true,
  "message": "Enquiry updated successfully",
  "data": {
    "_id": "67013f9b8c2a4e1234567890",
    "name": "Arindam Mukherjee",
    "email": "a.mukherjee@disastermanagement.gov.in",
    "phone": "+91 9433011223",
    "userType": "Customer",
    "interest": "Search &amp; Rescue UAV Deployment",
    "message": "We need thermal hexacopters for flood relief operations.",
    "status": "In Progress",
    "createdAt": "2026-10-05T13:10:00.000Z",
    "updatedAt": "2026-10-05T13:15:22.000Z"
  }
}
```

#### Error Response (`400 Bad Request` / `404 Not Found`)

```json
{
  "success": false,
  "message": "Invalid status value. Allowed values: New, Contacted, In Progress, Closed"
}
```

---

### 3.5 Delete an Enquiry

Permanently deletes an enquiry record from the database via the Admin Dashboard modal.

- **Endpoint:** `DELETE /api/enquiries/:id`
- **URL Parameter:** `id` (String — valid MongoDB ObjectId)

#### Example Request

```http
DELETE http://localhost:3011/api/enquiries/67013f9b8c2a4e1234567890
```

#### Success Response (`200 OK`)

```json
{
  "success": true,
  "message": "Enquiry deleted successfully"
}
```

#### Error Response (`404 Not Found`)

```json
{
  "success": false,
  "message": "Enquiry not found"
}
```

---

## 4. Standard HTTP Status Codes Summary

| Status Code                 | Meaning          | When It Is Returned                                                        |
| :-------------------------- | :--------------- | :------------------------------------------------------------------------- |
| `200 OK`                    | Success          | `GET`, `PUT`, or `DELETE` request completed successfully                   |
| `201 Created`               | Created          | `POST` request created a new enquiry in MongoDB                            |
| `400 Bad Request`           | Validation Error | Missing required fields, invalid email/phone format, or invalid `ObjectId` |
| `404 Not Found`             | Not Found        | Target enquiry `_id` does not exist in the database                        |
| `500 Internal Server Error` | Server Error     | Unexpected database connection or runtime error                            |

---

## 5. Quick cURL Testing Commands

```bash
# 1. Create an Enquiry
curl -X POST http://localhost:3011/api/enquiries/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Kabir Verma","email":"kabir@university.edu.in","phone":"9876543210","userType":"Student","interest":"GIS and Mapping Specialist","message":"Looking for course syllabus."}'

# 2. Fetch All Enquiries
curl -X GET http://localhost:3011/api/enquiries/

# 3. Update Enquiry Status (replace <ID> with actual _id)
curl -X PUT http://localhost:3011/api/enquiries/<ID> \
  -H "Content-Type: application/json" \
  -d '{"status":"Contacted"}'

# 4. Delete Enquiry (replace <ID> with actual _id)
curl -X DELETE http://localhost:3011/api/enquiries/<ID>
```
