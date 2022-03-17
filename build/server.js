"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_js_1 = __importDefault(require("./data.js"));
const app = express_1.default();
app.get('/', (req, res) => {
    res.send('API RUNNING...');
});
app.get('/api/products', (req, res) => {
    res.json(data_js_1.default);
});
const port = 3000;
app.listen(port);
app.on('listening', () => {
    console.info('server up listening');
});
