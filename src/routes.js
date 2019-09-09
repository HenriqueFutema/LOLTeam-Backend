const express = require("express");
const routes = express.Router();
const multer = require("multer");
const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const CommentController = require("./controllers/CommentController");
const LikeController = require("./controllers/LikeController");
const StatusLolController = require("./controllers/StatusLolController");
const TeamController = require("./controllers/TeamController");



//Rota GetUser para auxiliar o front
routes.get("/users/:id", UserController.show);
routes.post("/signup", UserController.store);

//Rota SignIN
routes.post("/signin", SessionController.store);

routes.use(require("./middleware/auth"));


//Rotas Players
routes.put("/user/:id", UserController.update);
routes.get("/users", UserController.index);
routes.get("/user/by", UserController.showByNick);

//Rota "Like" Player
routes.get("/user/like", LikeController.index);
routes.post("/user/like", LikeController.store);

//Rota Comentário
routes.post("/comment", CommentController.store);

//Rota Get status no lol
routes.get("/status/lol", StatusLolController.show);

//Rotas Team
routes.get("/teams", TeamController.index);
routes.get("/team/:name", TeamController.show);

routes.post("/team", TeamController.store);
routes.post("/candidate/:id", TeamController.apply);

module.exports = routes;