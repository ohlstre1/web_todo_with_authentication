import { Hono } from "./deps.js";
import * as authController from "./authController.js";
import * as todoController from "./todoController.js";
import * as mainController from "./mainController.js";
import * as middlewares from "./middlewares.js";

const app = new Hono();

app.use("*", middlewares.addUserToContextMiddleware);
app.use("/todos/*", middlewares.accessControlMiddleware);

app.get("/auth/login", authController.showLoginForm);
app.post("/auth/login", authController.loginUser);
app.get("/auth/registration", authController.showRegistrationForm);
app.post("/auth/registration", authController.registerUser);
app.post("/auth/logout", authController.logoutUser);

app.get("/todos", todoController.showForm);
app.get("/todos/:id", todoController.showTodo);
app.post("/todos", todoController.createTodo);
app.post("/todos/:id", todoController.updateTodo);
app.post("/todos/:id/delete", todoController.deleteTodo);

app.get("/", mainController.showMain);

export default app;