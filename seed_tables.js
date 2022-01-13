var AWS = require("aws-sdk"),
  DDB = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
    region: "us-east-1",
  });

function pushToCollectionTable() {
  var collection = {},
    collection_formatted_arr = [],
    params = {};

  var Collection_DATA_ARR = require("./collections.json");

  for (var i_int = 0; i_int < Collection_DATA_ARR.length; i_int += 1) {
    collection = {
      PutRequest: {
        Item: {
          id: {
            S: Collection_DATA_ARR[i_int].id,
          },
          category: {
            S: Collection_DATA_ARR[i_int].category,
          },
          name: {
            S: Collection_DATA_ARR[i_int].name,
          },
          description: {
            S: Collection_DATA_ARR[i_int].description,
          },
          logo: {
            S: Collection_DATA_ARR[i_int].logo,
          },
          banner: {
            S: Collection_DATA_ARR[i_int].banner,
          },
          owner: {
            S: Collection_DATA_ARR[i_int].owner,
          },
          verified: {
            BOOL: Collection_DATA_ARR[i_int].verified,
          },
        },
      },
    };
    collection_formatted_arr.push(collection);
  }
  params = {
    RequestItems: {
      "p8-nftdev2-collection-test": collection_formatted_arr.reverse(),
    },
  };
  return DDB.batchWriteItem(params).promise();
}

function pushToAssetTable() {
  var asset = {},
    count = 1,
    asset_formatted_arr1 = [],
    asset_formatted_arr2 = [],
    asset_formatted_arr3 = [],
    params = {};

  var Asset_DATA_ARR = require("./asset.json");

  for (var i_int = 0; i_int < Asset_DATA_ARR.length; i_int += 1) {
    asset = {
      PutRequest: {
        Item: {
          id: {
            S: Asset_DATA_ARR[i_int].id,
          },
          collection: {
            S: Asset_DATA_ARR[i_int].collection,
          },
          type: {
            S: Asset_DATA_ARR[i_int].type,
          },
          status: {
            S: Asset_DATA_ARR[i_int].status,
          },
          name: {
            S: Asset_DATA_ARR[i_int].name,
          },
          description: {
            S: Asset_DATA_ARR[i_int].description,
          },
          image: {
            S: Asset_DATA_ARR[i_int].image,
          },
          contract: {
            M: {
              blockchain: { S: Asset_DATA_ARR[i_int].contract.blockchain },
              address: { S: Asset_DATA_ARR[i_int].contract.address },
              type: { S: Asset_DATA_ARR[i_int].contract.type },
            },
          },
          token: {
            M: {
              id: { S: Asset_DATA_ARR[i_int].token.id },
              url: { S: Asset_DATA_ARR[i_int].token.url },
            },
          },
        },
      },
    };
    if (count <= 24) {
      asset_formatted_arr1.push(asset);
    } else if (count <= 48) {
      asset_formatted_arr2.push(asset);
    } else {
      asset_formatted_arr3.push(asset);
    }
    count += 1;

    // console.log(Asset_DATA_ARR[i_int].token);
  }
  params1 = {
    RequestItems: {
      "p8-nftdev2-asset-test": asset_formatted_arr1.reverse(),
    },
  };
  params2 = {
    RequestItems: {
      "p8-nftdev2-asset-test": asset_formatted_arr2.reverse(),
    },
  };
  params3 = {
    RequestItems: {
      "p8-nftdev2-asset-test": asset_formatted_arr3.reverse(),
    },
  };
  //   return asset_formatted_arr[0].PutRequest.Item.tok;
  console.log(asset_formatted_arr1.length);
  DDB.batchWriteItem(params2).promise();
  DDB.batchWriteItem(params3).promise();
  return DDB.batchWriteItem(params1).promise();
}

(async function seed() {
  console.time("Starting");
  //async 2x speed
  try {
    console.log(
      await Promise.all([
        pushToCollectionTable(),
        pushToAssetTable(),
        // pushToDragonCurrentPowerTable(),
        // pushToDragonBonusAttackTable(),
      ])
    );
  } catch (err) {
    console.log(err);
  }
  console.timeEnd("End");
})();
