import fetch from "node-fetch";
import ArtistModel from './../model/artist';

const Artist = {
    get: async () => {
        ArtistModel.getJoin() //.filter({userId: userId})
            .run()
            .then((results) => {
                return results;
            });
    },
    create: async (args) => {
        ArtistModel(args).saveAll().then((results) => {
            return results;
        });
    }
};

export default Artist;