import fetch from "node-fetch";
import FanModel from './../model/fan';

const Fan = {
    get: async () => {
        FanModel.getJoin() //.filter({userId: userId})
            .run()
            .then((results) => {
                return results;
            });
    },
    create: async (args) => {
        FanModel(args).saveAll().then((results) => {
            return results;
        });
    }
};

export default Fan;