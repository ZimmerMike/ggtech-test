"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const platformSchema = new mongoose_1.default.Schema({
// Define fields as per the schema provided.
});
exports.default = mongoose_1.default.model('Platform', platformSchema);
