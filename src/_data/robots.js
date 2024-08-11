import { AssetCache } from "@11ty/eleventy-fetch";
import fetch from "node-fetch";

export default async function() {
    console.log("Fetching robots.txt");

    let asset = new AssetCache("robots.txt");

    if (asset.isCacheValid('1d')) {
        console.log("Returning robots.txt from cache");
        return await asset.getCachedValue();
    }

    const res = await fetch("https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt");
    let txt = await res.text();

    txt = txt.split("\n")
        .join("\n");

    const bots = txt.split("\n")
        .filter(line => line.startsWith("User-agent:"))
        .map(line => line.split(":")[1].trim());

    const data = {
        txt: txt,
        htaccess: bots.join('|'),
    };

    await asset.save(data, "json");

    return data;
}