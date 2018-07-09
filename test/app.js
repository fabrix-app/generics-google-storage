'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')
// const path = require('path')

module.exports = _.defaultsDeep({
  pkg: {
    name: require('../package').name + '-test'
  },
  api: {},
  config: {
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('@fabrix/spool-generics').GenericsSpool
      ]
    },
    generics: {
      google_storage: {
        adapter: require('../dist').GoogleStorageGeneric,
        config: {
          project_id: process.env.GCLOUD_PROJECT_ID,
          key_filename: process.env.GCLOUD_KEY_FILENAME,
          bucket: process.env.GCLOUD_BUCKET,
          host: process.env.GCLOUD_HOST
        }
      }
    }
  }
}, smokesignals.FailsafeConfig)


