const OpenseaScraper = require("./src/index.js");
const fs = require("fs");
// switch on/off which function to demo
const demoCollectionInfo = true;
const slug = "dcl-names";

(async () => {
  // basic info
  if (demoCollectionInfo) {
    console.log(`\n\n\n\n✅ === OpenseaScraper.collectionInfo(slug) ===`);
    const collectionInfo = await OpenseaScraper.collectionInfo(slug);
    let data = JSON.stringify(collectionInfo);
    fs.writeFileSync("collection.json", data);
    console.log(`basic info (taken from the opensea API):`);
    console.log(collectionInfo);
  }
  console.log("\n🎉 DEMO ENDED 🥳");
})();
