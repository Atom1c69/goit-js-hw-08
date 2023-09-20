import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const videoPlayer = new Player('vimeo-player');
const STORAGE_KEY = 'videoplayer-current-time';

const savePlayTime = throttle(function () {
  videoPlayer.getCurrentTime().then(function (currentTime) {
    localStorage.setItem(STORAGE_KEY, currentTime);
  });
}, 1000);

localStorage.setItem('local', 'test');
videoPlayer.on('timeupdate', savePlayTime);

videoPlayer.ready().then(function () {
  const playTime = localStorage.getItem(STORAGE_KEY);

  if (playTime) {
    videoPlayer.setCurrentTime(playTime);
  }
});
