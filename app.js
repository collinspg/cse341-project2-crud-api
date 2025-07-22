const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

dotenv.config();
require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
  })
);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('CSE341 Project 2 - Week 3 CRUD API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
