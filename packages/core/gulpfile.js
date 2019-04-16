const gulp = require('gulp');
const run = require('gulp-run');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const yaml = require('js-yaml');
const fs = require('fs');
const { remove } = require('lodash');

const doc = yaml.safeLoad(fs.readFileSync('.graphqlconfig.yml'));
const amplifyDir = doc.projects.uibcore.extensions.amplify.docsFilePath;

function generateCode(cb) {
  /**
   * Read from schema.graphql & get an array of models
   */
  const schema = fs.readFileSync('./amplify/#current-cloud-backend/api/uibcore/schema.graphql', 'utf8');
  const modelsRegex = /(?<=type\s)(\w+?)(?=\s@model)/g;
  let models = schema.match(modelsRegex);
  // Match all except model
  models = remove(models, model => model !== 'Model');


  /**
  * Get directory of generated amplify graphql files
  */
  // const doc = yaml.safeLoad(fs.readFileSync('.graphqlconfig.yml'));
  // let amplifyDir = doc.projects.uibcore.extensions.amplify.docsFilePath;


  /**
  * Clean directory
  */
  // gulp.src('app/*').pipe(clean());
  const directories = ['pages', 'src/containers'];

  /**
   * Loop through graphql models & generate templates for each module
   */
  models.forEach((m) => {
    const model = m.toLowerCase();
    console.log(`Generating template for ${model}`);

    /**
     * Clear directories
     */
    directories.forEach((dir) => {
      const directory = `${dir}/${model}`;
      // console.log(directory);
      gulp.src(directory, { allowEmpty: true }).pipe(clean({ allowEmpty: true }));
    });

    /**
     * Generate model
     */
    run(`hygen uib-crud new --name ${model}`)
      .exec()
      .on('error', gutil.log);
  });

  cb();
}


function createTemplate(cb) {
  gulp.src('_templates/uib-crud/*').pipe(clean());
  run('hygen-create generate').exec();
  cb();
}


function test(cb) {
  gulp.src('app/**/!(a)').pipe(clean());
  cb();
}

/**
 * Step 1: Create template using template container
 */
exports.createTemplate = createTemplate;

/**
 * Step 2: Read schema.graphql to get all models
 */

/**
 * Step 3: Loop through each model and generate
 */
exports.generateCode = generateCode;

exports.default = test;
