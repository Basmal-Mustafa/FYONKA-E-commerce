const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const createUploadsDir = () => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log('Uploads directory created successfully at:', uploadsDir);
    } else {
        console.log('Uploads directory already exists at:', uploadsDir);
    }
};

module.exports = {
    createUploadsDir
}; 