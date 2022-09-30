import { IsEmail, IsString, IsNotEmpty, ValidateNested } from 'class-validator';


export class CustomerDto {
    @IsString()
    @IsNotEmpty({message:'ID should not be empty'})
    ID: string   
    
    @IsString()
    @IsNotEmpty({message:'Name should not be empty'})
    NAME: string
     
    @IsNotEmpty({message:'Contact should not be empty'})
    @IsString()
    CONTACT: string

    @IsEmail({message:'Provide a valid format for email'})
    @IsNotEmpty({message:'Email should not be empty'})
    EMAIL: string

    @IsString()
    @IsNotEmpty({message:'Gender should not be empty'})
    GENDER: string

    @IsString()
    @IsNotEmpty({message:'Address should not be empty'})
    ADDRESS: string

    @IsString()
    @IsNotEmpty({message:'Password should not be empty'})
    PASSWORD: string
}




