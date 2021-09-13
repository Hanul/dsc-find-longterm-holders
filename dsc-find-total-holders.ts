
const Caver = require("caver-js");

(async () => {
    const caver = new Caver("https://api.dogesound.club:9013/");
    const contract = new caver.contract.create(require("./MateContractABI.json"), "0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae");
    const owners: string[] = [];
    const promises: Promise<any>[] = [];
    for (let i = 0; i < 10000; i += 1) {
        promises.push((async () => {
            console.log(i);
            const owner = await contract.methods.ownerOf(i).call();
            if (owners.includes(owner) !== true) {
                owners.push(owner);
            }
        })());
    }
    await Promise.all(promises);
    console.log(owners);
})();