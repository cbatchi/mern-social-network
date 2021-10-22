// Allow to load all modules
const [
  express,
  cors,
  cookieParser,
  morgan,
  serverStart,
  loadRoutes,
  dbConnection,
  apiRoutes,
  {checkUser, requireAuth}
] = require("./tools/loadModule")([
  "express",
  "cors",
  "cookie-parser",
  "morgan",
  "../tools/serverStart",
  "../tools/loadRoutes",
  "../config/db.config",
  "../config/route.config",
  "../middlewares/auth.middleware",
]);

// Create new express app instance
const app = express();

// Allow to be connected to database
dbConnection();

// Parse incoming requests
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// Allow to load all routes
loadRoutes(apiRoutes, (key, value) => {
  app.use(key, require(value))
});

// Allow to launch new server instance
serverStart(process.env, app);


