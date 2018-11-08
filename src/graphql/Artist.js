import { pull } from 'lodash';
import ArtistModel from '../model/artist';
import FanModel from '../model/fan';

const Artist = {
  get: async (id) => {
    try {
      if (id) {
        const results = await ArtistModel.get(id).getJoin().run();
        return results;
      }
      const results = await ArtistModel.getJoin().run();
      return results;
    } catch (error) {
      return null;
    }
  },
  create: async (args) => {
    try {
      const results = await ArtistModel(args).saveAll();
      return ({
        artistId: results.id,
      });
    } catch (error) {
      return ({
        errors: [{ message: `could not create${error.message}` }],
      });
    }
  },
  update: async (args) => {
    try {
      const artist = await ArtistModel.get(args.id).run();
      const results = artist.merge(args).save();
      return { artist: results };
    } catch (error) {
      return { errors: [{ message: `could not update${error.message}` }] };
    }
  },
  destroy: async (id) => {
    try {
      const artist = ArtistModel.get(id).run();
      if (!artist) {
        return null;
      }
      const results = artist.delete();
      return {
        artistId: id,
      };
    } catch (error) {
      return { errors: [{ message: `could not delete ${error.message}` }] };
    }
  },
  addFan: async (args) => {
    try {
      const artist = await ArtistModel.get(args.artistId).getJoin().run();
      const fan = await FanModel.get(args.fanId).run();
      artist.fans.push(fan);
      const results = await artist.saveAll();
      return artist;
    } catch (error) {
      return { errors: [{ message: error.message }] };
    }
  },
  removeFan: async (args) => {
    try {
      const artist = await ArtistModel.get(args.artistId).getJoin().run();

      if (artist.fans) {
        delete artist.fans[artist.fans.findIndex(i => i.id === args.fanId)];
      }

      const results = await artist.saveAll();
      return artist;
    } catch (error) {
      return { errors: [{ message: error.message }] };
    }
  },
};

export default Artist;

/*
query getallfans {
 fans {
  name
  id
 }
}

mutation createFan {
  createFan(name:"fan2") {
    fanId
    errors {
      message
    }

  }
}

# mutation updateFan {
#   updateFan(id:"bd458d38-16d5-4285-9954-52b8307ec3af" name:"newName")
#   {
#     fan {
#       name
#       id
#     }
#   }
# }

# mutation deleteFan {
#   deleteFan(id:"bd458d38-16d5-4285-9954-52b8307ec3af") {
#     message
#   }
# }

mutation createQ {
  createArtist(name: "testName") {
    artistId
  }
}

mutation removeAFan {
  artistRemoveFan(
    artistId: "8b696f69-9128-4d86-a2b4-9dc6859c9705"
    fanId:"ff1ede1c-c29b-48f7-aed6-b4807b95af91"
  ) {
    id
    name
    fans {
      id
      name
    }
  }
}


mutation addafan {
  artistAddFan(artistId:"8b696f69-9128-4d86-a2b4-9dc6859c9705"
  	fanId: "1e987101-0002-4716-b404-379f0ec00762") {
    id
    name
    fans {
      id
      name
    }
  }
}

mutation addafan3 {
  artistAddFan(artistId:"8b696f69-9128-4d86-a2b4-9dc6859c9705"
  	fanId: "ff1ede1c-c29b-48f7-aed6-b4807b95af91") {
    id
    name
    fans {
      id
      name
    }
  }
}


query getAllArtist {
artists {
  name
  id
  fans {
    name
    id
  }
}
}

query ArtistQuery {
artist(id: "8b696f69-9128-4d86-a2b4-9dc6859c9705") {
  name
  id
  fans {
    name
    id
  }
}
}

mutation deleteArtistMutation {
  deleteArtist(id: "b865031d-ee2a-401d-9a7f-ecbf51d6e148")
  {
      artistId
  }
}

mutation updateArtistMutation {
  updateArtist( id: "b865031d-ee2a-401d-9a7f-ecbf51d6e148" name:"ASDF" )
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
