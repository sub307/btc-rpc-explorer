var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"HTH",
		multiplier:1,
		default:true,
		values:["", "hth", "HTH"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mHTH",
		multiplier:1000,
		values:["mhth"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"HTHbits",
		multiplier:1000000,
		values:["hthbits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"HTHsat",
		multiplier:100000000,
		values:["hthsat", "hthsatoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"BTC",
		multiplier:"btc",
		values:["btc"],
		decimalPlaces:8,
		symbol:"BTC"
	},
];

module.exports = {
	name:"Help The Homeless Coin",
	ticker:"HTH",
	logoUrl:"https://explorer.hth.world/images/hth.png",
	siteTitle:"HTH Explorer",
	siteDescriptionHtml:"<b>HTH Explorer</b> is an RPC-based explorer." ,
	nodeTitle:"Help The Homeless Node",
	nodeUrl:"https://github.com/HTHcoin/HTH",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json",
		"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json"
	],
	maxBlockWeight: 4000000,
	targetBlockTimeSeconds: 60,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"HTH":currencyUnits[0], "mHTH":currencyUnits[1], "HTHbits":currencyUnits[2], "HTHsat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	genesisBlockHash: "00000c979767eea90a249ba1bb13c7e3e9edbb70374c23e4c728bb0c1a0e695f",
	genesisCoinbaseTransactionId: "a268c21ee7847acc52dd62d17339d12aeb541033645e64b2cfb78ce66668a25c",
	genesisCoinbaseTransaction: {
		"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff03510101ffffffff0100ba1dd2050000002321027e84468db2b27966d0cd99cff3a36fea242ac29a5c909099dc09ea2a778cd9e7ac00000000",
  "txid": "a268c21ee7847acc52dd62d17339d12aeb541033645e64b2cfb78ce66668a25c",
  "size": 98,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "coinbase": "510101",
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 250,
      "valueSat": 25000000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "027e84468db2b27966d0cd99cff3a36fea242ac29a5c909099dc09ea2a778cd9e7 OP_CHECKSIG",
        "hex": "21027e84468db2b27966d0cd99cff3a36fea242ac29a5c909099dc09ea2a778cd9e7ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": [
          "HNM6H78WY48iLi1MfT8QnYHKSxCPUTEkub"
        ]
      }
    }
  ],
  "blockhash": "00000c979767eea90a249ba1bb13c7e3e9edbb70374c23e4c728bb0c1a0e695f",
  "height": 1,
  "confirmations": 476237,
  "time": 1530005154,
  "blocktime": 1530005154
	},
	historicalData: [
		{
			type: "blockheight",
			date: "2018-06-26",
			blockHeight: 0,
			blockHash: "00000c979767eea90a249ba1bb13c7e3e9edbb70374c23e4c728bb0c1a0e695f",
			summary: "The Bitcoin Genesis Block.",
			alertBodyHtml: "This is the first block in the HTH blockchain, known as the 'Genesis Block'.",
			referenceUrl: "https://hth.world"
		},
		{
			type: "tx",
			date: "2018-06-26",
			txid: "a268c21ee7847acc52dd62d17339d12aeb541033645e64b2cfb78ce66668a25c",
			summary: "The coinbase transaction of the Genesis Block.",
			alertBodyHtml: "This is the coinbase transaction of the <a href='/block/00000c979767eea90a249ba1bb13c7e3e9edbb70374c23e4c728bb0c1a0e695f'>HTHcoin Genesis Block</a>.",
			referenceUrl: "_blank"
		},
		{
			type:"address",
			date:"2018-09-03",
			address:"HQvnLwk1wvzY8jPjVtDdx8JVBnD3i6G5zk",
			summary:"Donation address for the Salvation Army of Athens, Greece",
			referenceUrl:"http://salvationarmy.gr",
			alertBodyHtml:"Donation Adress of Salvation Army of Athens, Greece"
		}		
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v2/ticker/3112/?convert=BTC",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			var exchangedCurrencies = ["USD", "BTC"];

			if (responseBody.data.quotes) {
				var exchangeRates = {};

				for (var i = 0; i < exchangedCurrencies.length; i++) {
					if (responseBody.data.quotes[exchangedCurrencies[i]]) {
						exchangeRates[exchangedCurrencies[i].toLowerCase()] = responseBody.data.quotes[exchangedCurrencies[i]].price;
					}
				}

				return exchangeRates;
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 210000);

		return eras[index];
	}
};
