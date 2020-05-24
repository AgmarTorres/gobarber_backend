"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var crypto_1 = __importDefault(require("crypto"));
var multer_1 = __importDefault(require("multer"));
var tmpfolder = path_1.default.resolve(__dirname, '..', '..', 'tmp');
exports.default = {
    directory: tmpfolder,
    storage: multer_1.default.diskStorage({
        destination: tmpfolder,
        filename: function (request, file, callback) {
            var fileHash = crypto_1.default.randomBytes(10).toString('HEX');
            var fileName = fileHash + "-" + file.originalname;
            return callback(null, fileName);
        },
    }),
};
