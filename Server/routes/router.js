const express = require("express");
const { apiRoutes } = require("./api/apiRoutes");
const { adminRoutes } = require("./admin/adminRoutes");

const mainRoute = express.Router();

const defaultRoutes = [
  { routePrefix: "/api", route: apiRoutes },
  { routePrefix: "/admin", route: adminRoutes },
];

defaultRoutes.forEach((item) => {
  mainRoute.use(item.routePrefix, item.route);
});

module.exports = { mainRoute };
