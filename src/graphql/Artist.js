import ArtistModel from './../model/artist';
import FanModel from './../model/fan';

const Artist = {
    get: (id) => {
        if (id) {
            return ArtistModel.get(id).getJoin().run();
        } else {
            return ArtistModel.getJoin().run();
        }
    },
    create: async (args) => {
        try {
            let results = await ArtistModel(args).saveAll();
            return ({
                artistId: results.id
            })
        } catch (error) {
            return ({
                errors: [{ message: 'could not create' + error.message }]
            });
        }
    },
    update: async (args) => {
        try {
            let artist = await ArtistModel.get(args.id).run();
            let results = artist.merge(args).save();
            return { artist: results };
        } catch (error) {
            return { errors: [{ message: 'could not update' + error.message }] }
        }
    },
    destroy: async (id) => {
        try {
            let artist = ArtistModel.get(id).run();
            if (!artist) {
                throw 'not found';
            }
            let results = artist.delete();
            return {
                artistId: id
            }
        } catch (error) {
            return { errors: [{ message: 'could not delete ' + error.message }] }
        }
    },
    addFan: async (args) => {
        try {
            let artist = await ArtistModel.get(args.artistId).run();
            let fan = await FanModel.get(args.fanId).run();
            //artist.fan.push(fan);
            let results = await artist.save();
            return { artist: results }
        } catch (error) {
            return { errors: [{ message: 'could not add fan' + error.message }]}
        }
    },
    removeFan: async (args) => {
        try {
            let artist = await ArtistModel.get(args.artistId).run();
            let fan = await FanModel.get(args.fanId).run();
            artist = artist.fan[fan.id].pop();
            //artist.fan.push(fan.id);
            let results = await artist.save();
            return { artist: results }
        } catch (error) {
            return { errors: [{ message: 'could not remove fan' + error.message }] }
        }
    },
};

export default Artist;

/*

mutation createQ {
  createArtist(name: "testName") {
    artistId
  }
}

query getAllArtist {
artists {
  name
  id
}
}

query ArtistQuery {
artist(id: "eb2ba04c-3341-4725-8311-03e0344a6fcb") {
  name
  id
}
}

mutation deleteArtistMutation {
  deleteArtist(id: "01de7b69-7b97-4536-a281-e8a4e5a38530")
  {
      artistId
  }
}

mutation updateArtistMutation {
  updateArtist( id: "01de7b69-7b97-4536-a281-e8a4e5a38530" name:"ASDF" )
  {
   artist {
    name
    id
  }
    errors {
      message
    }
  }
}

*/