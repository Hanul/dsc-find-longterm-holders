import SkyFiles from "skyfiles";

(async () => {
    const raw = await SkyFiles.readText("raw");
    const texts = raw.split("\n");
    let all: any[] = [];
    for (let i = 0; i < 2679; i += 3) {
        const str = texts[i].trim();
        const rank = str.substring(0, str.indexOf("0x"));
        const address = str.substring(str.indexOf("0x"));
        const count = parseInt(texts[i + 1].trim(), 10);
        const percent = texts[i + 2].trim();
        all.push({ rank, address, count, percent });
    }
    all.sort((a, b) => a.rank - b.rank);

    for (let i = 0; i < 9; i += 1) {

        let parameter1 = "[";
        let parameter2 = "[";
        for (const [index, info] of all.entries()) {
            if (index >= i * 100 && index < (i + 1) * 100) {
                if (index > i * 100) {
                    parameter1 += ",";
                    parameter2 += ",";
                }
                parameter1 += index;
                parameter2 += `"${info.address}"`;
            }
        }
        parameter1 += "]";
        parameter2 += "]";
        await SkyFiles.write(`parameters/parameter-${i}-2.txt`, parameter1);
        await SkyFiles.write(`parameters/parameter-${i}-1.txt`, parameter2);
    }
})();