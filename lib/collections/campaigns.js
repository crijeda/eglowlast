Campaigns = new Mongo.Collection("campaigns");

PostsSchema = new SimpleSchema({
  // createdAt: {
  //   type: Date,
  //   autoValue: function() {
  //     return moment().toDate();
  //   }
  // },
  // user: {
  //   type: String,
  //   autoValue: function() {
  //     return Meteor.userId();
  //   }
  // },
  social: {
    type: String,
    optional: true,
    label: "Red Social",
    allowedValues: ["Twitter", "Instagram"]
  },

  post: {
    type: String,
    optional: true,
    label: "Descripción",
    autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  },
  date: {
    type: String,
    label:"Fecha de Publicación",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "date"
      }
    }
  },
    fileId: {
    type: String,
    optional: true,
    label: "Fotografía",
    autoform: {
      afFieldInput: {
        type:"cfs-file",
        collection:"uploads",
      }
    }
  },
  status: {
    type: Boolean,
    optional: true,
    label: "Post Publicado",
  }

});

Campaigns.attachSchema(new SimpleSchema({

  name: {
      type: String,
      optional: true,
      label: "Nombre"
  },

  brands: {
    type: [String],
    label: "Marca",
    optional: true,
    autoform: {
      type: "select",
      afFieldInput: {

      },
      options: function() {
      var brands1 = Brands.find().fetch();
      var brands = _.sortBy(brands1, "name");

      var data = new Array();
      var len = brands.length;

      for (i = 0; i < len; i++) { 
        data.push({
          label: brands[i].name,
          value: brands[i]._id
        })
      };
      return data;

      }
    }
  },

  user: {
    type: [String],
    label: "Influenciador",
    optional: true,
    autoform: {
      type: "select",
      afFieldInput: {

      },
      options: function() {
        var user = Meteor.users.find({roles:"Influencer"}).fetch();

        var data = new Array();
        var len = user.length;

        for (i = 0; i < len; i++) { 

          if (typeof user[i].username != "undefined"){
            data.push({
              label: user[i].username,
              value: user[i]._id
            })
          }

        };

        return data;

      }
    }
  },

  description: {
    type: String,
    label:"Descripción",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  },

  fromdate: {
    type: String,
    label:"Desde",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "date"
      }
    }
  },

  todate: {
      type: String,
      label:"Hasta",
      optional: true,
      autoform: {
        afFieldInput: {
          type: "date"
        }
      }
  },

  social: {
    type: [String],
    label:"Redes Sociales",
    optional: true,
    autoform: {
      type: "select2",
      afFieldInput: {
        multiple: true
      },
      options: function() {
        return [
          {
            label: "Twitter",
            value: "Twitter"
          }, {
            label: "Instagram",
            value: "Instagram"
          }
        ];
      }
    }
  },

  budget: {
    type: Number,
    label:"Presupuesto",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "number"
      }
    }
  },

  posts: {
    optional: true,
    type: [PostsSchema],
    label: 'Publicaciones'
  },

  complete: {
    type: Boolean,
    optional: true,
    label: "Campaña Terminada",
  },

  status: {
    type: Boolean,
    //optional: true,
    label: "Aceptar Campaña",
    defaultValue: false,
  }

}));

TabularTables = {};

TabularTables.Campaigns = new Tabular.Table({
    name: "Campaigns",
    autoWidth: false,
    order: [[0, "asc"]],
    collection: Campaigns,
    columns: [
    {data: "name", title: "Campaña"},
    {tmpl: Meteor.isClient && Template.ButtonShowCampaigns}
   
    // {tmpl: Meteor.isClient && Template.sincInstaSoap, title: "Instagram"},
    // {tmpl: Meteor.isClient && Template.ButtonShowUsersProfiles}
]

});