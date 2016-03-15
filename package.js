Package.describe({
    summary: 'Custom Events functionality by Nicholas C. Zakas',
    version: '1.0.2',
    git: 'https://github.com/nerdmed/zEvent-meteor.git',
    name: 'nerdmed:zevent'
});

Package.onUse(function(api) {
    api.addFiles('src/zevents.js');

    api.export('zEvent');
    api.export('zEventTarget');
});
