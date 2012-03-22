beforeEach(function () {
    this.addMatchers({
//    toBePlaying: function(expectedSong) {
//      var player = this.actual;
//      return player.currentlyPlayingSong === expectedSong &&
//             player.isPlaying;
//    }
    });
});

(function () {
    var done;

    window.asyncSpecWait = function (timeoutMessage, timeout) {
        done = false;
        waitsFor(function () {
            var x = timeoutMessage;
            return done;
        }, timeoutMessage, timeout);

    };

    window.asyncSpecDone = function () {
        done = true;
    }
}());


function assert(test, text) {

}

function runOnce(func) {
    func.alreadyRun === true || func();
    func.alreadyRun = true;
}
