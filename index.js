const express = require('express');
const sheets = require('./googleSheetsService');
const app = express();
const port = process.env.PORT || 8080;
const values = require('./values')

require('./logOutboundRequests');
require('./generate-google-api-credentials');

app.use(express.static('public'));

app.get('/api/get-return-address/:productName', async (req, res) => {
  console.log("---------------\nInbound request:")
  console.log(req.path);
  const { productName } = req.params;
  if(!(productName)) {
    throw new Error('Missing parameters')
  }
  console.log(req.params);
  try {
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const { DATA_TAB_NAME, PRODUCT_COLUMN, ADDRESS_COLUMN } = values;
    const result = await sheets.getReturnAddress(
      GOOGLE_SHEET_ID, DATA_TAB_NAME, PRODUCT_COLUMN, ADDRESS_COLUMN, productName
    );
    res.send(result);
  } catch(e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
})

app.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).send(err);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
}) 

