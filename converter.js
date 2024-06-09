const fs = require('fs-extra');
const JSZip = require('jszip');

// Function to convert a zipped JSON file into a prettified JSON file
async function convertZippedJSONToFile(zippedFilePath, outputFilePath) {
  try {
    const vttData = await fs.readFile(zippedFilePath);
    const zip = await JSZip.loadAsync(vttData);
    const jsonString = await zip.file('0.json').async('string');
    const parsedJsonData = JSON.parse(jsonString);
    
    // Prettify the JSON with 2 spaces indentation
    const prettifiedJsonString = JSON.stringify(parsedJsonData, null, 2);

    await fs.writeFile(outputFilePath, prettifiedJsonString);
    console.log('Prettified JSON file has been written successfully to', outputFilePath);
  } catch (err) {
    console.error('Error converting zipped JSON to file:', err);
  }
}

// Function to convert a JSON file into a compressed file with vtt extension
async function convertJSONToZippedFile(jsonFilePath, zippedOutputPath) {
  try {
    const fileData = await fs.readFile(jsonFilePath, 'utf8');
    const state = JSON.parse(fileData);

    const zip = new JSZip();
    zip.file('0.json', JSON.stringify(state));

    const nodeStream = zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true });

    nodeStream.pipe(fs.createWriteStream(zippedOutputPath))
      .on('finish', function () {
        console.log('Compressed file written successfully to', zippedOutputPath);
      });
  } catch (err) {
    console.error('Error converting JSON to zipped file:', err);
  }
}

// Usage from CLI
if (require.main === module) {
  const operation = process.argv[2];
  const inputPath = process.argv[3];
  const outputPath = process.argv[4];

  if (operation === 'unzip-json' && inputPath && outputPath) {
    convertZippedJSONToFile(inputPath, outputPath);
  } else if (operation === 'zip-json' && inputPath && outputPath) {
    convertJSONToZippedFile(inputPath, outputPath);
  } else {
    console.log('Usage: node script.js <operation> <inputPath> <outputPath>');
    console.log('Operations: unzip-json, zip-json');
  }
}
