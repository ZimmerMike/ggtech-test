import { App } from './src/app';

const _app = new App();
const expressApp = _app.getExpress();
const PORT = process.env.PORT || 3000;



expressApp.listen(PORT, () => {
  console.log(`Server is super running on port ${PORT}`);
});