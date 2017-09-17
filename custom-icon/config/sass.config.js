// https://www.npmjs.com/package/node-sass

module.exports = {
  includePaths: [
    'node_modules/ionic-angular/themes',
    'node_modules/ionicons/dist/scss',
    'node_modules/ionic-angular/fonts',
    'node_modules/ionic2-custom-icons/ionic/scss/',
    '.tmp-custom-icons/scss/'
  ],

  variableSassFiles: [
    '{{SRC}}/theme/variables.scss',
    '.tmp-custom-icons/scss/variables.scss'
  ]
};
