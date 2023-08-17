"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    icon: String,
    title: String,
    createdAt: Date,
    updatedAt: Date,
});
const Platform = mongoose_1.default.model('Platform', movieSchema);
exports.default = Platform;
