import * as bcrypt from 'bcrypt';

export function passwordEncrypt(password:string){
    const saltOrRounds = 10;
    const salt = bcrypt.genSaltSync(saltOrRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;

    
}

export function comparePass( hashpassword:string, password:string){
    return bcrypt.compareSync( password, hashpassword);
}