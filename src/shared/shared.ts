import { extname } from 'path'

export function   editFileName (req, file, callback) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const namess="asdaw";
    const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    const finalNmae=randomName + namess;
    callback(null, `${name}-${finalNmae}${fileExtName}`);
  };

  export function imageFileFilter (req, file, callback){
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
      }




      callback(null, true);
    };