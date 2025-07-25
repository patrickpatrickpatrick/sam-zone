import Fetch from "@11ty/eleventy-fetch";
import { parse, stringify } from 'yaml'

export default async function () {
  const remoteData = await Fetch("https://raw.githubusercontent.com/patrickpatrickpatrick/website-info/main/data.yml", {
    duration: "60s",
    type: "text",
    returnType: "text"
  });
  const { featured_photos, albums } = parse(remoteData);

  return await Promise.all(albums.map(async (albumName) => {
    const albumData = await Fetch(`https://raw.githubusercontent.com/patrickpatrickpatrick/website-info/main/albums/${albumName}.yml`, {
      duration: "60s",
      type: "text",
      returnType: "text"
    });
    const { photos, name } = parse(albumData);

    return photos.map((photo) => ({
      ...photo,
      album: name,
    }))
  })).then((values) => {
    return values.reduce((allPhotos, photos) => [ ...allPhotos, ...photos ], []).filter((photo) => featured_photos.find(file  => file === photo.file ))
  })
}