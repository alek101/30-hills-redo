/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

const fs = require('fs');
const { createDoc } = require('apidoc');
const path = require('path');

const docsLocation = path.join(__dirname, '../doc');
const components = path.join(__dirname, '../people');

// Deleting prevouis doc folder
fs.rmdirSync(docsLocation, { recursive: true });

const doc = createDoc({
  src: components,
  dest: docsLocation,
});

if (typeof doc !== 'boolean') {
  // Documentation was generated!
  console.log(`Apidoc generated at ${docsLocation}`);
}
