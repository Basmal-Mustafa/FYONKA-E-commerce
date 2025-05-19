const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db.connection");
const swaggerUi = require("swagger-ui-express");
const mcache = require('memory-cache');
const path = require('path');
const { createUploadsDir } = require('./config/init');

const swaggerDocument = require("./swagger.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize required directories
createUploadsDir();

// Cache middleware
const cache = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = mcache.get(key);
    
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

const frontendUrls = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: frontendUrls,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up all routes without rate limiting
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/categories", require("./routes/category.routes"));
app.use("/api/reviews", require("./routes/review.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/contact", require("./routes/contact.routes"));

app.get("/", (req, res) => res.send("Server is running"));

const { errorHandler } = require("./middleware/error.middleware");
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  connectDB()
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
});

/*كله تمام*/