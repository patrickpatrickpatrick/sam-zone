import Fetch from "@11ty/eleventy-fetch";
import { parse, stringify } from 'yaml'

export default async function () {
  const remoteData = await Fetch("https://raw.githubusercontent.com/patrickpatrickpatrick/website-info/main/data.yml", {
    duration: "60s",
    type: "text",
    returnType: "text"
  });

  const data = parse(remoteData);

  const albums = await Promise.all(data.albums.map(async (albumName) => {
    const albumData = await Fetch(`https://raw.githubusercontent.com/patrickpatrickpatrick/website-info/main/albums/${albumName}.yml`, {
      duration: "60s",
      type: "text",
      returnType: "text"
    });
    return parse(albumData);
  })).then((values) => values)

  return albums
}