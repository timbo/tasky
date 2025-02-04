import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: '*',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
