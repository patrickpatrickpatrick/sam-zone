import Fetch from "@11ty/eleventy-fetch";
import { parse, stringify } from 'yaml'

export default async function () {
  const remoteData = await Fetch(`${process.env.DATA_URL}${process.env.COMMIT_HASH || 'main'}/data.yml`, {
    duration: "60s",
    type: "text",
    returnType: "text"
  });
  const data = parse(remoteData);

  return await Promise.all(data.albums.map(async (albumName) => {
    const albumData = await Fetch(`${process.env.DATA_URL}${process.env.COMMIT_HASH || 'main'}/albums/${albumName}.yml`, {
      duration: "60s",
      type: "text",
      returnType: "text"
    });
    const { photos } = parse(albumData);

    return photos
  })).then((values) => {
  	return values.reduce((allPhotos, photos) => [ ...allPhotos, ...photos ], [])
  })
}