"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("../Utils/upload"));
const Admin_controller_1 = require("../Controllers/Admin.controller");
const router = (0, express_1.Router)();
router.post('/upload', upload_1.default.single('file'), Admin_controller_1.uploadImage);
router.post('/login', Admin_controller_1.LoginAdmin);
exports.default = router;
