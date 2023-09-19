import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const videoPlayer = new Player('vimeo-player');

const savePlayTime = throttle(function () {
  videoPlayer.getCurrentTime().then(function (currentTime) {
    localStorage.setItem('videoplayer-current-time', currentTime);
  });
}, 1000);

localStorage.setItem('local', 'test');
videoPlayer.on('timeupdate', savePlayTime);

videoPlayer.ready().then(function () {
  const playTime = localStorage.getItem('videoplayer-current-time');

  if (playTime) {
    videoPlayer.setCurrentTime(playTime);
  }
});
