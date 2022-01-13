const OpenseaScraper = require("./src/index.js");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// switch on/off which function to demo

const slugDict = {
  ambienft: ["MUSIC", "AUDIO"],
  rtfkteastereggs: ["ART", "VIDEO"],
  "stoner-cats-official": ["COLLECTIBLES", "IMAGE"],
  "bikes-of-burden": ["PHOTOGRAPHY", "IMAGE"],
  "rob-gronkowski-championship-series-nfts": ["SPORTS", "VIDEO"],
  "eth-men": ["TRADING_CARDS", "IMAGE"],
};

(async () => {
  // basic info
  let finalAsset = [];
  let finalCollections = [];
  for ([key, val] of Object.entries(slugDict)) {
    let slug = key;
    console.log(`\n\n\n\n✅ === OpenseaScraper.collectionInfo(slug) ===`);
    const collectionInfo = await OpenseaScraper.collectionInfo(slug);
    let collectionID = uuidv4();
    let ownerID = uuidv4();

    collectionInfo.category = val[0];
    collectionInfo.id = collectionID;
    collectionInfo.owner = ownerID;

    finalCollections.push(collectionInfo);
    let data = JSON.stringify(collectionInfo);
    fs.writeFileSync(
      path.resolve("./data-collections", `${slug}-collection.json`),
      data
    );
    console.log(collectionInfo);

    console.log(`\n\n\n\n✅ === OpenseaScraper.assetsInfo(slug) ===`);
    let assetsInfo = await OpenseaScraper.assetInfo(slug, collectionID, val[1]);
    for (const asset of assetsInfo) {
      finalAsset.push(asset);
    }
    let dataAssets = JSON.stringify(assetsInfo);
    fs.writeFileSync(
      path.resolve("./data-assets", `${slug}-assets.json`),
      dataAssets
    );
    console.log(assetsInfo);
  }

  console.log(finalCollections.length);
  let collec = JSON.stringify(finalCollections);
  fs.writeFileSync(`collections.json`, collec);

  console.log(finalAsset.length);
  let asset = JSON.stringify(finalAsset);
  fs.writeFileSync(`asset.json`, asset);
  console.log("\n🎉 DEMO ENDED 🥳");
})();
