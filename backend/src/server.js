import dotenv from 'dotenv';
import { createApp } from './app.js';
import { sequelize } from './adapters/out/persistence/sequelize/models/index.js';
import { seedDatabase } from './database/seed.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const app = createApp();

const start = async () => {
  await sequelize.sync();
  await seedDatabase();

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
};

start().catch((error) => {
  console.error('Failed to start application', error);
  process.exit(1);
});
