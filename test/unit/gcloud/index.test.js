'use strict'
/* global describe, it */
const assert = require('assert')
const path = require('path')
const fs = require('fs')

describe('Data Store Generic gcloud', () => {
  let DataStoreGenericService
  let Gcloud
  before((done) => {
    DataStoreGenericService = global.app.services.DataStoreGenericService
    Gcloud = global.app.config.get('generics.google_storage')
    done()
  })

  it('should exist', () => {
    assert(DataStoreGenericService)
    assert(Gcloud)
    console.log('USING AUTH FILE:', Gcloud.config.key_filename)
  })

  it('should upload a buffer', (done) => {

    fs.readFile(path.resolve(__dirname, '../../static/test.jpg'), function (err, data) {
      if (err) {
        console.error(err)
      }
      else {
        DataStoreGenericService.upload({
          mimetype: 'image/jpg',
          originalname: 'test.jpg',
          buffer: data
        }, Gcloud)
          .then(image => {
            assert.equal(image.status, 'success')
            assert.ok(image.url)
            done()
          })
          .catch(err => {
            done(err)
          })
      }
    })
  })
  it('should upload a file', (done) => {
    DataStoreGenericService.uploadFile({
      src: path.resolve(__dirname, '../../static/test.jpg'),
      url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
    }, Gcloud)
      .then(file => {
        assert.equal(file.status, 'success')
        assert.equal(file.url, `https://storage.googleapis.com/${Gcloud.config.bucket}/test.jpg`)
        assert.ok(file.file_details)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('should upload files', (done) => {
    DataStoreGenericService.uploadFiles([{
      src: path.resolve(__dirname, '../../static/test.jpg'),
      url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
    }], Gcloud)
      .then(files => {
        assert.equal(files.length, 1)
        assert.equal(files[0].url, `https://storage.googleapis.com/${Gcloud.config.bucket}/test.jpg`)
        assert.ok(files[0].file_details)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
