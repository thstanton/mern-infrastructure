import express from 'express'
import path from 'path'
import favicon from 'serve-favicon';
import logger from 'morgan'
import { fileURLToPath } from 'url';
import checkToken from './config/checkToken.js';

// Connect to database
import 'dotenv/config'
import './config/database.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import { router as userRoutes } from './routes/api/users.js'

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify token
app.use(checkToken)

// Configure to use port 4000 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 4000

// Put API routes here, before the "catch all" route
app.use('/api/users', userRoutes)

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => console.log(`Express running on port ${port}`))