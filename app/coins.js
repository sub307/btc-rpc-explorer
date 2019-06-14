var btc = require("./coins/btc.js");
var ltc = require("./coins/ltc.js");
var hth = require("./coins/hth.js");

module.exports = {
	"BTC": btc,
	"LTC": ltc,
	"HTH": hth,

	"coins":["BTC", "LTC", "HTH"]
};
