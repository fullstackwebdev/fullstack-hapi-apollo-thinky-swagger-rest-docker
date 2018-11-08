import { r, type } from 'thinky';
import Fan from './fan';

const thinky = require('thinky')();

const Artist = thinky.createModel('Artist', {
  id: type.string(),
  name: type.string(),
  // profile: type.string(),
  // fans: type.string(), // fanId
});

// // auto increment ID
// Artist.pre('save', (next) => {
//     let self = this;
//     r.table('Artist').count().run().then((count) => {
//         self.increment = count++;
//         next();
//     })
//     next();
// })

// Model.hasMany(OtherModel, fieldName, leftKey, rightKey[, options]);
// Fan.hasMany(Artist, 'fanId', 'id', 'fanId');

// Fan.hasMany(Artist, "artists", "id", "fanId")
Artist.hasMany(Fan, 'fans', 'id', 'id');

Fan.hasAndBelongsToMany(Artist, 'fans', 'id', 'id');

export default Artist;
