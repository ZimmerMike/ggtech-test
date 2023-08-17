"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    movie: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Movie' },
    platform: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Platform' },
    author: String,
    body: String,
    score: Number,
    createdAt: Date,
    updatedAt: Date,
});
const Review = mongoose_1.default.model('Review', reviewSchema);
exports.default = Review;
