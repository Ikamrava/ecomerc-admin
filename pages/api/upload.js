import multiparty from 'multiparty';
import mime from 'mime-types';
import fs from 'fs';
import path from 'path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export default async function handler(req, res) {
    const form = new multiparty.Form();
    const {fields,files} = await new Promise((resolve,reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({fields,files});
        });
    })

    const client = new S3Client({
        region: 'us-east-1',    
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
            
    })

    const links = [];

    

    for(const file of files.image){
        const ext = file.originalFilename.split('.').pop();
        const newFileName = `${Date.now()}.${ext}`;
        console.log(file)

        await client.send(new PutObjectCommand({
            Bucket: 'nextjs-ecomm',
            Key: newFileName,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path)
           
        }))
        const link = `https://nextjs-ecomm.s3.amazonaws.com/${newFileName}`;
        links.push(link);
    
    }

    return res.status(200).json({ links });
}




export const config = {
    api: { bodyParser: false },
}

  