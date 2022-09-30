import { Module } from '@nestjs/common';
import { UploadFilesController } from './upload-files.controller';
import { UploadFilesService } from './upload-files.service';
import { Customers } from '../upload-files/entity/customer.entity';
import { customerError } from '../upload-files/entity/error.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customers,customerError])

  ],
  controllers: [UploadFilesController],
  providers: [UploadFilesService]
})

export class UploadFilesModule {}
