Profile = new Mongo.Collection("profile");

Profile.attachSchema(new SimpleSchema({

    userId: {
        type: String,
        optional: true,
    },
    firstname: {
        type: String,
        optional: true,
        label: "Nombre"
    },
    lastname: {
        type: String,
        optional: true,
        label: "Apellido"
    },
    phone: {
        type: String,
        optional: true,
        label: "Telefono"
    },
    address: {
        type: String,
        optional: true,
        label: "Direccion"
    },
    bio: {
        type: String,
        label: "Bio",
        optional: true,
        autoform: {
          afFieldInput: {
            type: "textarea"
              }
        }
    },
    emailaccount: {
        type: String,
        optional: true,
        label:"E-mail de Contacto",
        autoform: {
          afFieldInput: {
            type: "email"
          }
        }
    },
    gender: {
        type: String,
        optional: true,
        label: "Género",
        allowedValues: ["Hombre", "Mujer"]
    },
    birthday: {
        type: String,
        optional: true,
        autoform: {
          afFieldInput: {
            type: "date"
          }
        }
   },
   brands: {
    type: [String],
    optional: true,
    autoform: {
      type: "select2",
      afFieldInput: {
        multiple: true
      },
      options: function() {
        var brands = Brands.find().fetch();
        var brands = _.sortBy(brands, "name");

        var data = new Array();
        var len = brands.length;
        
        for (i = 0; i < len; i++) { 
         data.push({
            label: brands[i].name,
            value: brands[i].name
        })};
                return data;

            }
    }
  },
    interests: {
    type: [String],
    optional: true,
    autoform: {
      type: "select2",
      afFieldInput: {
        multiple: true
      },
      options: function() {
                return [{
                    label: "Deportes",
                    value: "Deportes"
                }, {
                    label: "Entretención",
                    value: "Entretención"
                }, {
                    label: "Automóviles",
                    value: "Automóviles"
                }, {
                    label: "Mascotas",
                    value: "Mascotas"
                }, {
                    label: "Eduación",
                    value: "Eduación"
                }, {
                    label: "Fotografía",
                    value: "Fotografía"
                }];

            }
    }
  },
    profession: {
    type: [String],
    optional: true,
    autoform: {
      type: "select2",
      afFieldInput: {
        multiple: true
      },
      options: function() {
                return [{
                    label: "Médico",
                    value: "Médico"
                }, {
                    label: "Ingeniero",
                    value: "Ingeniero"
                }, {
                    label: "Abogado",
                    value: "Abogado"
                }, {
                    label: "Publicista",
                    value: "Publicista"
                }, {
                    label: "Actor",
                    value: "Actor"
                }, {
                    label: "Profesor",
                    value: "Profesor"
                }];

            }
    }
  },
     twitterAccount: {
        type: String,
        optional: true,
        label: "Cuenta en Twitter Sin @"
    },
     instagramAccount: {
        type: String,
        optional: true,
        label: "Cuenta en Instagram Sin @"
    },


}));

TabularTables = {};

TabularTables.Profile = new Tabular.Table({
    name: "Profile",
    autoWidth: false,
    order: [[0, "asc"]],
    collection: Profile,
    columns: [
    {data: "twitterAccount", title: "Cuenta Twitter"},
    {data: "instagramAccount", title: "Cuenta Instagram"},
        { data: "twitterAccount", title: "Data Twitter", render: function (val, type, doc) {
        var x = val;
        var datatw  = DataTwitter.find({screenname:x}).fetch()
        if (typeof datatw[0] !== 'undefined') {
            
            return  '<span class="label label-success">'+datatw[0].screenname+'</span>';
                
            }
        
        else{
            return  '<span class="label label-danger">Sin Conexión</span>';

            }
        }
    },
    {tmpl: Meteor.isClient && Template.sincTwSoap, title: "Twitter"},
            { data: "instagramAccount", title: "Data Instagram", render: function (val, type, doc) {
        var x = val;
        var datainsta  = DataInstagram.find({screenname:x}).fetch()
        if (typeof datainsta[0] !== 'undefined') {
            
            return  '<span class="label label-success">'+datainsta[0].screenname+'</span>';
                
            }
        
        else{
            return  '<span class="label label-danger">Sin Conexión</span>';

            }
        }
    },
    {tmpl: Meteor.isClient && Template.sincInstaSoap, title: "Instagram"},
    {tmpl: Meteor.isClient && Template.ButtonShowUsersProfiles}
]

});