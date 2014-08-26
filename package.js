Package.describe({
  summary: "Custom Events functionality by Nicholas C. Zakas",
  version: "1.0.0",
  git: "https://github.com/nerdmed/zEvent-meteor.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0');
  api.addFiles('distrib/zevents.js');
  
  api.export('zEvent');
  api.export('zEventTarget');
});
