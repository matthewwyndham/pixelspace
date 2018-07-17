function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

function timelapse() {
    $.ajax({url: "/allPixels", success: function(result) {
      result.forEach(row => {
        var identity = "x" + (row.x).toString() + "y" + (row.y).toString();
        $("#" + identity).css('backgroundColor', 'rgba(' + (row.r).toString() + ', ' + (row.g).toString() + ', ' + (row.b).toString() + ', ' + (row.a).toString() + ')');
        sleep(100);
      });
    }});
  }

function timelapseRefresh() {
    for (let x = 0; x <= 100; x++) {
        for (let y = 0; y <= 100; y++) {
            var identity =  "x" + x.toString() + "y" + y.toString();
            $("#" + identity).css('backgroundColor', 'rgba(255, 255, 255, 1.0)');
        }
    }
    timelapse();
}