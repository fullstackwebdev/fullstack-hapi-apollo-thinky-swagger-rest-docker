import { r, type } from "thinky";
const thinky = require("thinky")();


const Artist = thinky.createModel("Artist", {
    id: type.string(),
    name: type.string(),
    profile: type.string(),
    fans: [type.string()],
});

// auto increment ID
Artist.pre('save', (next) => {
    let self = this;
    r.table('Artist').count().run().then((count) => {
        self.increment = count++;
        next();
    })
    next();
})

export { Artist };

