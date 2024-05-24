const express = require('express');
const fs = require('fs');
const moment = require('moment');

const app = express();
const port = 3000;

app.use(express.json());

// Load data from JSON files
let rooms = loadData('rooms.json');
let bookings = loadData('bookings.json');

// Helper function to load data from JSON file
function loadData(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return [];
    }
}

// Helper function to save data to JSON file
function saveData(filename, data) {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error saving ${filename}:`, error);
    }
}

// Endpoint to create a room
app.post('/rooms', (req, res) => {
    const { name, seats, amenities, pricePerHour } = req.body;
    const room = { id: rooms.length + 1, name, seats, amenities, pricePerHour };
    rooms.push(room);
    saveData('rooms.json', rooms);
    res.send(room);
});

// Endpoint to book a room
app.post('/bookings', (req, res) => {
    const { roomId, customerName, date, startTime, endTime } = req.body;
    
    // Check for conflicting bookings
    const conflictingBooking = bookings.find(booking =>
        booking.roomId === roomId &&
        booking.date === date &&
        ((moment(startTime, 'HH:mm') >= moment(booking.startTime, 'HH:mm') && moment(startTime, 'HH:mm') < moment(booking.endTime, 'HH:mm')) ||
         (moment(endTime, 'HH:mm') > moment(booking.startTime, 'HH:mm') && moment(endTime, 'HH:mm') <= moment(booking.endTime, 'HH:mm')))
    );

    if (conflictingBooking) {
        return res.status(400).send('The room is already booked for the same date and time.');
    }

    const booking = { id: bookings.length + 1, roomId, customerName, date, startTime, endTime };
    bookings.push(booking);
    saveData('bookings.json', bookings);
    res.send(booking);
});

// Endpoint to list all rooms
app.get('/rooms', (req, res) => {
    res.send(rooms);
});

// Endpoint to list all bookings
app.get('/bookings', (req, res) => {
    res.send(bookings);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
