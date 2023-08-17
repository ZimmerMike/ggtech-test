"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const _app = new app_1.App();
const expressApp = _app.getExpress();
const PORT = process.env.PORT || 3000;
expressApp.listen(PORT, () => {
    console.log(`Server is super running on port ${PORT}`);
});
