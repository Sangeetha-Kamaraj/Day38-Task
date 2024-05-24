Hall Booking API

The Hall Booking API is a simple Node.js application that allows users to create rooms, book rooms, and retrieve booking information. This API can be used for managing hall bookings in various scenarios such as conferences, meetings, events, etc.

Features

Create a Room: Users can create a room with details such as name, number of seats, amenities, and price per hour.

Book a Room: Users can book a room for a specific date and time, providing customer name, room ID, date, start time, and end time.

Retrieve Room Information: Users can retrieve information about all available rooms and their details.

Retrieve Booking Information: Users can retrieve information about all bookings, including customer name, room ID, date, start time, and end time.

Prevent Conflicting Bookings: The API prevents users from booking a room that is already booked for the same date and time.

Getting Started

Install dependencies:
npm install

Start the server:
node server.js

Use Postman or any API testing tool to make requests to the API endpoints:

POST /rooms: Create a new room.
POST /bookings: Book a room.
GET /rooms: Retrieve all available rooms.
GET /bookings: Retrieve all bookings

API Documentation

For detailed documentation on how to use the API endpoints, please refer to the Postman documentation available here. You can import the Postman collection and environment provided in the postman directory to get started quickly.

Technologies Used

Node.js
Express.js
Postman (for testing API endpoints)