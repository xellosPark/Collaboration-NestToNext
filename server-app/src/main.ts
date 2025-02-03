import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 9801);
  console.log(`http://localhost:${process.env.PORT ?? 9801}`);
}

bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
