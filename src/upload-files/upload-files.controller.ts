import { Controller, Post,Get, UploadedFile, UseInterceptors, NotFoundException,Body, BadRequestException, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { UploadFilesService } from '../upload-files/upload-files.service';
import { CustomerDto } from './dto/customer.dto';



@Controller('upload-files')
export class UploadFilesController {

    constructor (private uploadFilesService:UploadFilesService) {}

  
    @Post('/validateCsv')
    @UseInterceptors(FileInterceptor('csv', {
        storage: diskStorage({
          destination: './csv',
          filename: (req, file, cb) => {
            if (!file.originalname.match(/\.(csv)$/)) 
              {return cb(new BadRequestException('Only CSV files are allowed!'),'false');}
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }))

    async validateCsv(@UploadedFile() file:Express.Multer.File){
        await this.uploadFilesService.validateCsv(file);
  
      }



      @Post('validate')
      validate(@Body() data:CustomerDto) {
       try{ 
        return "Sucessfully validated";
       }
       catch(error)
       {
        return error;
       }
      }


      @Get('/getCustomers')
      async getCustomerDetails() {
          const customerDetails = await this.uploadFilesService.getCustomers();
          if (customerDetails.length == 0) {
              throw new NotFoundException("Cannot retrieve customer details");
          }
          return customerDetails;
  
      }

      @Get('/getCustomerErrors')
      async getCustomerErrors() {
          const customerDetails = await this.uploadFilesService.getCustomerErrors();
          if (customerDetails.length == 0) {
              throw new NotFoundException("Cannot retrieve customer details");
          }
          return customerDetails;
  
      }

      
    @Put('/updateCustomer')
    async updateCustomer(@Body() body: Partial<CustomerDto>) {
        const user = await this.uploadFilesService.updateCustomer(body)
        return user;

    }

      
    }


