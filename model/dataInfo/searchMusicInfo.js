class SearchMusicInfo {
  constructor ({ id, name, songer, image, album }) {
    this.id = id
    this.name = name
    this.songer = songer
    this.image = image
    this.album = album
  }
}

export function createSearchMusicInfo (data) {
  return new SearchMusicInfo({
    id: data.id,
    name: data.name,
    songer: filterSinger(data.artists),
    image: data.album.artist.img1v1Url,
    album: data.album.name
  })
}

function filterSinger (singer) {
  const ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
