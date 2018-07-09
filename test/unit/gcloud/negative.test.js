'use strict'
/* global describe, it */
const assert = require('assert')
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
  })

})
