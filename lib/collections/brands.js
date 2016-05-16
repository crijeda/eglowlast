Brands = new Mongo.Collection("brands");

Brands.attachSchema(new SimpleSchema({

    name: {
        type: String,
        optional: true,
        label: "Nombre"
    },
    fileId: {
    type: String,
    label: "Logo",
    optional: true
    }


}));

TabularTables = {};

TabularTables.Brands = new Tabular.Table({
    name: "Brands",
    autoWidth: false,
    order: [[0, "asc"]],
    collection: Brands,
    columns: [
    {data: "name", title: "Marca"},
    {tmpl: Meteor.isClient && Template.ButtonShowBrands}
   
    // {tmpl: Meteor.isClient && Template.sincInstaSoap, title: "Instagram"},
    // {tmpl: Meteor.isClient && Template.ButtonShowUsersProfiles}
]

});