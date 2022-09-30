import { Module,ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [UploadFilesModule,
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV}`
      }
    ), 

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          database: config.get<string>('DB_NAME'),
          host: config.get<string>('HOST'),
          username: config.get<string>('USER'),
          password: config.get<string>('PWD'),
          entities: ["./**/*.entity.js"],
          synchronize: true
        }

      }
    })

  ],
  controllers: [AppController],
  providers: [AppService, ConfigService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },],
})
export class AppModule {}
