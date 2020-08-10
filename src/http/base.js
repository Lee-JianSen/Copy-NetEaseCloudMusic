import {GetMusicCheck} from "./all-api";

export default {
    install(Vue) {
        Vue.prototype.musicCheck = function (musicId) {
            GetMusicCheck(musicId).then(res => {
            }).catch(error => {
                console.log('获取音乐是否可用失败');
                console.dir(error.message);
            })
        }

    }
}