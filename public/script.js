  function refresh() {
      $.ajax({url: "/allPixels", success: function(result) {
        console.log(result);
        result.forEach(row => {
          var identity = "x" + (row.x).toString() + "y" + (row.y).toString();
          $("#" + identity).css('backgroundColor', 'rgba(' + (row.r).toString() + ', ' + (row.g).toString() + ', ' + (row.b).toString() + ', ' + (row.a).toString() + ')');
        });
      }});
    }

    function create_new(x, y, r, g, b, a) {
        var identity = "x" + x.toString() + "y" + y.toString();
          $("#" + identity).css('backgroundColor', 'rgba(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ', ' + a.toString() + ')');
    }