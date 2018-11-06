import { r, type } from "thinky";
const thinky = require("thinky")();


const Fan = thinky.createModel("Fan", {
    id: type.string(),
    name: type.string(),
    artistId: type.string()
});

// // auto increment ID
// Fan.pre('save', (next) => {
//     let self = this;
//     r.table('Fan').count().run().then((count) => {
//         self.increment = count++;
//         next();
//     })
//     next();
// })

export default Fan ;

