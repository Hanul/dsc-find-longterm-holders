const Caver = require("caver-js");

(async () => {
    const caver = new Caver("https://api.dogesound.club:9013/");
    const contract = new caver.contract.create(require("./MateContractABI.json"), "0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae");
    await contract.events.Transfer({
        fromBlock: 64117201,
        toBlock: "latest",
    }, (error: any, data: any) => {
        console.log(error)
    });
})();