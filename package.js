Package.describe({
  summary: "Added Custom Events functionality by Nicolas Z"
});

Package.on_use(function (api, where) {
  api.add_files(['distrib/zevents.js'], 'client');


  api.export([
    'zEvent',
    'zEventTarget'
  ]);

});