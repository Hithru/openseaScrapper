const axios = require("axios");
const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");

/**
 * gets basic info of a collection from the API
 * => api.opensea.io/collection/{slug}
 * no puppeteer is involved here
 */
const assetInfo = async (slug, collectionID, dataType) => {
  const assetsArray = [];
  const response = await axios.get(
    `https://api.opensea.io/api/v1/assets?collection=${slug}&offset=0&limit=10`
  );

  let assetsObj = response.data.assets;

  for (const asset of assetsObj) {
    let assetID = uuidv4();
    let formatAsset = {
      id: assetID,
      collection: collectionID,
      type: dataType,
      status: "ISSUED",
      name: asset.name,
      description: asset.description,
      image: asset.image_url,
      contract: {
        blockchain: "ETHEREUM",
        address: asset.asset_contract.address,
        type: asset.asset_contract.schema_name,
      },
      token: {
        id: asset.token_id,
        url: asset.permalink,
      },
    };
    assetsArray.push(formatAsset);
  }
  return assetsArray;
};

function _getStats(collectionObj) {
  try {
    return _camelCase(collectionObj.stats);
  } catch (err) {
    return null;
  }
}
function _getName(collectionObj) {
  try {
    return collectionObj.name;
  } catch (err) {
    return null;
  }
}
function _getContractAddress(collectionObj) {
  try {
    return collectionObj.primary_asset_contracts[0].address;
  } catch (err) {
    return null;
  }
}

function _getPrimaryOwner(collectionObj) {
  try {
    return collectionObj.primary_asset_contracts[0].owner;
  } catch (err) {
    return null;
  }
}
function _getBannerImageUrl(collectionObj) {
  try {
    return collectionObj.banner_image_url;
  } catch (err) {
    return null;
  }
}
function _getImageUrl(collectionObj) {
  try {
    return collectionObj.image_url;
  } catch (err) {
    return null;
  }
}
function _getDiscord(collectionObj) {
  try {
    return collectionObj.discord_url;
  } catch (err) {
    return null;
  }
}
function _getMedium(collectionObj) {
  try {
    return collectionObj.medium_username;
  } catch (err) {
    return null;
  }
}
function _getTwitter(collectionObj) {
  try {
    return collectionObj.twitter_username;
  } catch (err) {
    return null;
  }
}
function _getWebsite(collectionObj) {
  try {
    return collectionObj.external_url;
  } catch (err) {
    return null;
  }
}
function _getTelegram(collectionObj) {
  try {
    return collectionObj.telegram_url;
  } catch (err) {
    return null;
  }
}
function _getInstagram(collectionObj) {
  try {
    return collectionObj.instagram_username;
  } catch (err) {
    return null;
  }
}
function _getWiki(collectionObj) {
  try {
    return collectionObj.wiki_url;
  } catch (err) {
    return null;
  }
}
function _getDescription(collectionObj) {
  try {
    return collectionObj.description;
  } catch (err) {
    return null;
  }
}
function _getSymbol(collectionObj) {
  try {
    return collectionObj.primary_asset_contracts[0].symbol;
  } catch (err) {
    return null;
  }
}
function _getSafelistRequestStatus(collectionObj) {
  try {
    return collectionObj.safelist_request_status;
  } catch (error) {
    return null;
  }
}
function _isVerified(collectionObj) {
  try {
    const safelistRequestStatus = _getSafelistRequestStatus(collectionObj);
    return safelistRequestStatus === "verified";
  } catch (error) {
    return null;
  }
}

function _camelCase(obj) {
  let newObj = {};
  for (d in obj) {
    if (obj.hasOwnProperty(d)) {
      newObj[
        d.replace(/(\_\w)/g, function (k) {
          return k[1].toUpperCase();
        })
      ] = obj[d];
    }
  }
  return newObj;
}

module.exports = assetInfo;
