"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const ioredis_1 = __importDefault(require("ioredis"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer);
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
});
const redis = new ioredis_1.default();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.static("./public"));
app.use(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = 'rate-limit';
        const value = yield redis.get(key);
        if (value == null) {
            yield redis.set(key, 0);
            yield redis.expire(key, 60);
        }
        if (Number(value) >= 10) {
            return res.json({ error: "Rate limit exceeded" });
        }
        yield redis.incr(key);
        next();
    });
});
app.get("/", (req, res) => {
    res.status(200).send("Hello World!  sd");
});
app.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://api.freeapi.app/api/v1/public/books");
    res.json(response.data);
}));
app.get("/books/totalPages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cached = yield redis.get("totalPages");
    if (cached) {
        return res.json(JSON.parse(cached));
    }
    const response = yield axios_1.default.get("https://api.freeapi.app/api/v1/public/books");
    const totalPages = (_a = response.data.data.data) === null || _a === void 0 ? void 0 : _a.reduce((acc, curr) => { var _a, _b; return !((_a = curr.volumeInfo) === null || _a === void 0 ? void 0 : _a.pageCount) ? 0 : ((_b = curr.volumeInfo) === null || _b === void 0 ? void 0 : _b.pageCount) + acc; }, 0);
    yield redis.set("totalPages", JSON.stringify(totalPages));
    return res.json(totalPages);
}));
// app.listen(PORT, () => {
//   console.log("Server is running on port 3000");
// });
httpServer.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
