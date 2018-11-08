import FanModel from '../model/fan';

const Fan = {
  get: (id) => {
    try {
      if (id) {
        return FanModel.get(id).getJoin().run();
      }
      return FanModel.getJoin().run();
    } catch (error) {
      return { errors: [{ message: `could not get fan ${error.message}` }] };
    }
  },
  create: async (args) => {
    try {
      const results = await FanModel(args).saveAll();
      return ({
        id: results.id,
      });
    } catch (error) {
      return ({
        errors: [{ message: `could not create ${error.message}` }],
      });
    }
  },
  update: async (args) => {
    try {
      const fan = await FanModel.get(args.id).run();
      const results = fan.merge(args).save();
      return { fan: results };
    } catch (error) {
      return { errors: [{ message: `could not update ${error.message}` }] };
    }
  },
  destroy: async (id) => {
    try {
      const fan = FanModel.get(id).run();
      const results = fan.delete();
      return {
        id: results.id,
      };
    } catch (error) {
      return { errors: [{ message: 'could not delete' }] };
    }
  },
};

export default Fan;

/*

query getallfans {
 fans {
  name
  id
 }
}

mutation createFan {
  createFan(name:"fan1") {
    fanId
    errors {
      message
    }

  }
}

mutation updateFan {
  updateFan(id:"7328803d-b0da-4e49-b034-2be51acd1a57" name:"newName")
  {
    fan {
      name
      id
    }
  }
}

mutation deleteFan {
  deleteFan(id:"7328803d-b0da-4e49-b034-2be51acd1a57") {
    message
  }
}

*/
