let pixels = [];

function timelapse() {
    $.ajax({url: "/allPixels", success: function(result) {
        pixels = result;
        
        // result.forEach(row => {
        // var identity = "x" + (row.x).toString() + "y" + (row.y).toString();
        // $("#" + identity).css('backgroundColor', 'rgba(' + (row.r).toString() + ', ' + (row.g).toString() + ', ' + (row.b).toString() + ', ' + (row.a).toString() + ')');
    //   });
    }});

    document.addEventListener('DOMContentLoaded', function() {  
        sequence(pixels, function(row, next) {
          var identity = "x" + (row.x).toString() + "y" + (row.y).toString();
          $("#" + identity).css('backgroundColor', 'rgba(' + (row.r).toString() + ', ' + (row.g).toString() + ', ' + (row.b).toString() + ', ' + (row.a).toString() + ')');
          
          setTimeout(next, 500); // delay of 500ms between pixels
        }, function() {
          console.log('All through!');
        });
      });
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


function sequence(arr, each, done) {
  let length = arr.length,
      index;
  (function next(arr, i) {
    index = i || 0;
    if (index < length) {
      each(arr[index], (function(arr, i) {
        return function() {
          next(arr, i);
        };
      })(arr, ++index));
    } else {
      done();
    }
  })(arr);
};




