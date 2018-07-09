import * as Storage from '@google-cloud/storage'

export class GoogleStorageGeneric {
  public config: {
    project_id: string,
    key_filename: string,
    host: string,
    bucket: string
  }

  constructor(config) {
    this.config = config
  }

  /**
   * Create Gcloud Instance
   * @returns {*} Gcloud Instance
   */
  storage() {
    return new Storage({
      projectId: this.config.project_id,
      keyFilename: this.config.key_filename
    })
  }

  /**
   *
   * @param filename
   * @returns {string}
   */
  getPublicUrl (filename) {
    if (this.config.host) {
      return `${this.config.host}/${filename}`
    }
    else {
      return `https://storage.googleapis.com/${this.config.bucket}/${filename}`
    }
  }

  /**
   *
   * @param buffer
   * @returns {Promise.<{status: string, url: string}>}
   */
  upload(reqFile) {
    const bucket = this.storage().bucket(this.config.bucket)
    const name = `${Date.now()}_${reqFile.originalname}`
    return new Promise((resolve, reject) => {
      bucket
        .file(name)
        .createWriteStream({
          metadata: {
            contentType: reqFile.mimetype
          }
        })
        .on('error', (err) => {
          return resolve({
            status: 'failure',
            failure_message: err.toString()
          })
        })
        .on('finish', () => {
          return resolve({
            status: 'success',
            url: this.getPublicUrl(name)
          })
        })
        .end(reqFile.buffer)
    })
  }

  /**
   *
   * @param file
   * @returns {Promise.<{status: string, url: string}>}
   */
  uploadFile(file) {
    const bucket = this.storage().bucket(this.config.bucket)
    return new Promise((resolve, reject) => {
      bucket.upload(file.src, (err, resFile) => {
        if (err) {
          // this.app.log.error(err)
          return resolve({
            url: file.url,
            status: 'failure',
            failure_message: err.toString()
          })
        }
        const proxySchema = {
          status: 'success',
          url: this.getPublicUrl(resFile.id),
          file_details: resFile
        }
        return resolve(proxySchema)
      })
    })
  }

  /**
   *
   * @param files
   * @returns {Promise.<Array>}
   */
  uploadFiles(files) {
    return Promise.all(files.map(file => {
      return this.uploadFile(file)
    }))
  }
}

