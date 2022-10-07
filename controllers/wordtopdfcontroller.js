const path = require('path');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
const asyncHandler = require('../middleware/async');

libre.convertAsync = require('util').promisify(libre.convert);

const wordPdfConvert = asyncHandler(async (req, res, next) => {
  const ext = '.pdf';

  const sourceFilePath = path.join(__dirname, '/resources/sample.docx');
  const outputFilePath = path.join(__dirname, `/resources/sample${ext}`);

  const docxBuf = await fs.readFile(sourceFilePath);

  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

  await fs.writeFile(outputFilePath, pdfBuf);

  res.json({
    success: true,
    message:
      'File Successfully converted and saved in resources folder inside controllers',
  });
});

module.exports = { wordPdfConvert };
