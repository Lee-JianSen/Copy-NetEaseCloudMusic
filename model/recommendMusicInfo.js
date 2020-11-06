class RecommendMusicInfo {
  constructor ({ titles, subTitles, singer, imageUrl, mainTitles, id, subTitlesType }) {
    this.titles = titles
    this.subTitles = subTitles
    this.singer = singer
    this.imageUrl = imageUrl
    this.mainTitles = mainTitles
    this.id = id
    this.subTitlesType = subTitlesType
  }
}

export function createRecommendMusicInfo ({ titleData, data }) {
  let info = data.uiElement
  let singer = data.resourceExtInfo.artists[0].name
  let subTitles = info.subTitle?.title ?? null
  let subTitlesType = info.subTitle?.titleType ?? ''
  return new RecommendMusicInfo({
    titles: info.mainTitle.title,
    subTitles: subTitles,
    singer: singer,
    imageUrl: info.image.imageUrl,
    mainTitles: titleData.uiElement.subTitle.title,
    id: data.resourceId,
    subTitlesType: subTitlesType
  })
}

export function createNewMusicOrDisc (data) {
  let info = data.uiElement
  let singer = data.resourceExtInfo?.artists ?? []
  let subTitles = info.subTitle?.title ?? null
  return new RecommendMusicInfo({
    titles: info.mainTitle.title,
    subTitles: subTitles,
    imageUrl: info.image.imageUrl,
    singer: filterSinger(singer),
    id: data.resourceId
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
