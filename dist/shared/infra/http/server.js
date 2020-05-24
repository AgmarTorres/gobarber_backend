"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var upload_1 = __importDefault(require("@config/upload"));
require("@shared/infra/typeorm/database/index");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.directory));
app.use(routes_1.default);
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internatl server error',
    });
});
app.get('/', function (request, response) {
    return response.json({ message: 'Hello World' });
});
app.post('/users', function (request, response) {
    var _a = request.body, name = _a.name, email = _a.email;
    var user = {
        name: name,
        email: email,
    };
    return response.json(user);
});
app.listen(3333, function () {
    console.log('Servidor executando!!!');
});
