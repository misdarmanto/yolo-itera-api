"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const access_1 = require("./access");
exports.middleware = { useAuthorization: access_1.useAuthorization };
