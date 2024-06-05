import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false // This is necessary if using a self-signed certificate; otherwise, set it to true for production
      },
      extra: {
        ssl: true,
      },
    }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
