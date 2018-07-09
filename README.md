# generics-google-storage

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Generic Data Store for Google Cloud through Spool-generics.

Looking for [Spool-Generics?](https://github.com/fabrix-app/spool-generics)

## Install

```sh
$ npm install --save @fabrix/generics-google-storage
```

## Configure

```js
// config/generics.ts
export const generics = {
  // make the key google_storage, alternatively make the key data_store_provider to be the default data store provider in many spools
  google_storage: {
    adapter: require('@fabrix/generics-google-storage').GoogleStorageGeneric,
    options: {
      project_id: process.env.GLCOUD_PROJECT_ID,
      key_filename: process.env.GCLOUD_KEY_FILENAME, // NOTE: Must Be Fully Resolved Path
      bucket: process.env.GCLOUD_BUCKET,
      host: process.env.GCLOUD_HOST
    }
  }
}
```

[npm-image]: https://img.shields.io/npm/v/@fabrix/generics-google-storage.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/generics-google-storage
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/generics-google-storage/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/generics-google-storage/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/generics-google-storage.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/generics-google-storage
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/Lobby
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/generics-google-storage.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/generics-google-storage/coverage

