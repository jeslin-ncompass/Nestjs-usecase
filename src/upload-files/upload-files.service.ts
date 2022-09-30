import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from '../upload-files/entity/customer.entity';
import { customerError } from '../upload-files/entity/error.entity';
import { CustomerDto } from './dto/customer.dto';
import  {  plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import * as csv from 'csvtojson';



@Injectable()
export class UploadFilesService {

    constructor(@InjectRepository(Customers) private customerRepo:Repository<Customers>,
    @InjectRepository(customerError) private customerErrorRepo:Repository<customerError>){}

   create(customerData:CustomerDto)    
    { try{
         this.customerRepo.save(customerData);
    }
    catch(error)
    {
        console.log(error);
        return error;
    }
    }
        
async validateCsv(file:Express.Multer.File)    
{ try 
    {
    console.log(file);
    const csvFilePath = process.cwd() + '/' + file.path;
    const customerArray= await csv().fromFile(csvFilePath);
    for(let i=0;i<customerArray.length;i++)
    {             
        const customerData=customerArray[i];   
        this.customerRepo.save(customerData); 
        const customerClassData=plainToInstance(CustomerDto,customerData);  
        await validate(customerClassData).then(errors=>
        {
           if(errors.length>0)
            {
                this.customerErrorRepo.save(customerData);                 

            }
        })
    }
}
    catch (error)
    {    
    return error;
    }

}


async getCustomers() {
    try{
    const customerData=await this.customerRepo.createQueryBuilder()
        .select(["ID", "NAME", "EMAIL", "CONTACT", "GENDER", "ADDRESS"])
        .getRawMany();
    return customerData; 
    } 
    catch(error)
    {
        
        return error;
    
    }

}   

async getCustomerErrors() {
    try{
    const customerData=await this.customerErrorRepo.createQueryBuilder()
        .select(["ID", "NAME", "EMAIL", "CONTACT", "GENDER", "ADDRESS"])
        .getRawMany();
    return customerData; 
    } 
    catch(error)
    {
        
        return error;
    
    }

}   
    
    

async updateCustomer(body: Partial<CustomerDto>) {

    const updateCustomer = await this.customerRepo.createQueryBuilder()
        .update(body)
        .set(body)
        .where('ID=:ID', { ID: body.ID })
        .updateEntity(true)
        .execute();
    return updateCustomer;

}
}
