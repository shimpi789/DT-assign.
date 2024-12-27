# Nudge API

A simple API to create, read, update, and delete (CRUD) "Nudge" objects. Built using Node.js, Express, and MongoDB without the use of the Mongoose library. The API allows users to manage "nudges" with various attributes like title, image, scheduled date, timing, and description.

---

## Table of Contents

1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [Running the App](#running-the-app)
4. [API Endpoints](#api-endpoints)
   - [Create Nudge](#create-nudge)
   - [Get All Nudges](#get-all-nudges)
   - [Get Nudge by ID](#get-nudge-by-id)
   - [Update Nudge](#update-nudge)
   - [Delete Nudge](#delete-nudge)

---

## Installation

Follow the steps below to install and run the Nudge API on your local machine.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/nudge-api.git
2.  **Navigate to the project directory**:

3. **Install the required dependencies**:
using "npm install"

4. **Set up the environment variables**:
Create a .env file in the root directory and add
# .env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nudgeDB
5. **Start the server:**:
npm run dev
npm start
6. **API documentation**:
1.Create a New Nudge
POST:/nudges
Request Body:
title: (string) 60 characters max
image: (file) Image file (jpg, png, etc.)
scheduledDate: (string) Date in dd/mm/yy format
timing: (object) { from: "hh:mm", to: "hh:mm" }
description: (string) Text description of the nudge
icon: (optional file) Icon image (optional)

**Response**:
{
  "success": true,
  "message": "Nudge created successfully",
  "data": {
    "id": "string",
    "title": "string",
    "imageUrl": "string",
    "scheduledDate": "dd/mm/yy",
    "timing": { "from": "hh:mm", "to": "hh:mm" },
    "description": "string",
    "iconUrl": "string (optional)"
  }
}

**Response Status Codes**
201 Created – Nudge successfully created.
400 Bad Request – Invalid input parameters.
500 Internal Server Error – Server error.


2.Get All Nudges
GET: /nudges
Retrieves a list of all nudges.
**Response**
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "imageUrl": "string",
      "scheduledDate": "dd/mm/yy",
      "timing": { "from": "hh:mm", "to": "hh:mm" },
      "description": "string",
      "iconUrl": "string (optional)"
    },
    ...
  ]
}

**Response Status Codes**
200 OK – Nudges retrieved successfully.
500 Internal Server Error – Server error.


3.Get a Specific Nudge
GET :/nudges/{id}

Retrieves a specific nudge by its ID.

Parameters:
id (path parameter) – The ID of the nudge.
**Response**
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "imageUrl": "string",
    "scheduledDate": "dd/mm/yy",
    "timing": { "from": "hh:mm", "to": "hh:mm" },
    "description": "string",
    "iconUrl": "string (optional)"
  }
}

**Response Status Codes**
200 OK – Nudge retrieved successfully.
404 Not Found – Nudge with the given ID does not exist.
500 Internal Server Error – Server error.


4.Update a Nudge
PUT :/nudges/{id}

Updates an existing nudge by its ID.

Parameters:
id (path parameter) – The ID of the nudge.
**Request Body**
title: (string) 60 characters max
image: (file) Image file (optional)
scheduledDate: (string) Date in dd/mm/yy format
timing: (object) { from: "hh:mm", to: "hh:mm" }
description: (string)
icon: (optional file) Icon image (optional)
**Response**
{
  "success": true,
  "message": "Nudge updated successfully",
  "data": {
    "id": "string",
    "title": "string",
    "imageUrl": "string",
    "scheduledDate": "dd/mm/yy",
    "timing": { "from": "hh:mm", "to": "hh:mm" },
    "description": "string",
    "iconUrl": "string (optional)"
  }
}

**Response Status Codes**
200 OK – Nudge updated successfully.
400 Bad Request – Invalid input parameters.
404 Not Found – Nudge with the given ID does not exist.
500 Internal Server Error – Server error.


