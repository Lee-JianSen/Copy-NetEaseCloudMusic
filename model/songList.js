class SongList {
    constructor({playCount, id, coverImgUrl, description}) {
        this.playCount = playCount;
        this.id = id;
        this.coverImgUrl = coverImgUrl;
        this.description = description;
    }
}

export function createSongList(data) {
    return new SongList({
        playCount: data.resources[0].resourceExtInfo.playCount,
        id: data.creativeId,
        coverImgUrl: data.uiElement.image.imageUrl,
        description: data.uiElement.mainTitle.title
    });
}