import albums from "./albums.json" with { type: "json" };


console.log(albums.reduce((photos, album) => [
	...photos,
	...album.photos
], []))

export default albums.reduce((photos, album) => [
	...photos,
	...album.photos
], [])