import { r, type } from "thinky";
const thinky = require("thinky")();
import Fan from './fan';

const Artist = thinky.createModel("Artist", {
    id: type.string(),
    name: type.string(),
    //profile: type.string(),
    Fans: [type.string()], // fan id
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

Artist.hasMany(Fan, 'Fans', 'id', 'id');

export default Artist ;

