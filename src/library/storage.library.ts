import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';

import Logger from 'library/logger.library';

class Storage {
  static uploadImage = (folder: string, photo: string) => {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const url = photo.replace(/^data:image\/\w+;base64,/, '');

    const base64Data = Buffer.from(url, 'base64');
    const type = photo.split(';')[0].split('/')[1];

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${folder}/${v4()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    };

    const s3Upload = s3.upload(params).promise();

    const s3UploadResponse = s3Upload
      .then(data => {
        const imageData = {
          key: data?.Key,
          url: data?.Location,
        };
        return { success: true, data: imageData };
      })
      .catch(error => {
        Logger.log.info(error);
        return { success: false, data: error };
      });

    return s3UploadResponse;
  };
}

export default Storage;
