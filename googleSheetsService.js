const { google } = require('googleapis');
const values = require('./values')

const serviceAccountKeyFile = "./service_account_credentials.json";

async function _getGoogleSheetClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: 'v4',
    auth: authClient,
  });
}

async function _readConfigSheet(sheetId) {
  const googleSheetClient = await _getGoogleSheetClient();
  const res = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${values.CONFIG_SHEET_NAME}!A:B`
  });
  return res.data.values;
}

async function _readGoogleSheet(googleSheetClient, sheetId, tabName, col1, col2) {
  const res = await googleSheetClient.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [`${tabName}!${col1}:${col1}`,`${tabName}!${col2}:${col2}`],
    majorDimension: 'COLUMNS'
  });
  
  const productNames = res.data.valueRanges[0].values[0].slice(1)
  const addresses = res.data.valueRanges[1].values[0].slice(1)
  var zippedArrays = productNames.map((e, i) => { return {name: e, address: addresses[i]} });

  return zippedArrays;
}

async function getGoogleSheet(sheetId, tabName, col1, col2) {
  const googleSheetClient = await _getGoogleSheetClient();
  const data = await _readGoogleSheet(googleSheetClient, sheetId, tabName, col1, col2);
  return data;
}

async function getDefaultAddress(sheetId) {
  const configRaw = await _readConfigSheet(sheetId);
  const config = {};
  configRaw.forEach(row => config[row[0]] = row[1])

  const defaultText = `${config[values.DEFAULT_PRE_TEXT_CONFIG_NAME]}

  ${config[values.DEFAULT_ADDRESS_CONFIG_NAME]}
  ${config[values.DEFAULT_COST_CONFIG_NAME]}

  ${config[values.DEFAULT_POST_TEXT_CONFIG_NAME]}`
  
  return defaultText;
}

async function getReturnAddress(sheetId, tabName, productColumn, addressColumn, productName) {
  console.log("Getting return address for: "+productName);

  const rows = await getGoogleSheet(sheetId, tabName, productColumn, addressColumn);

  const foundEntry = rows.find(r => r.name == productName);
  console.log(foundEntry);

  if(!foundEntry){
    const defaultAddress = await getDefaultAddress(sheetId);
    return defaultAddress;
  }
  if(!foundEntry.address) {
    throw new Error('No address associated with product');
  }
  return foundEntry.address;
}

module.exports = { getReturnAddress }