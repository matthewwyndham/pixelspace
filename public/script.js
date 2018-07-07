  function refresh() {
      $.ajax({url: "/allPixels", success: function(result) {
        console.log(result);
        result.forEach(row => {
          var identity = "x" + (row.x).toString() + "y" + (row.y).toString();
          $("#" + identity).css('backgroundColor', 'rgba(' + (row.r).toString() + ', ' + (row.g).toString() + ', ' + (row.b).toString() + ', ' + (row.a).toString() + ')');
        });
      }});
    }

    function create_new() {
      var x = document.getElementById('form-x');
      var y = document.getElementById('form-y');
      var r = document.getElementById('form-r');
      var g = document.getElementById('form-g');
      var b = document.getElementById('form-b');
      var a = document.getElementById('form-a');
      var n = document.getElementById('form-name');
      var addurl = "/add?x=" + x.toString() + "&y=" + y.toString() + "&r=" + r.toString() + "&g=" + g.toString() + "&b=" + b.toString() + "&a=" + a.toString() + "&username=" + n.toString();
      $.ajax({url: addurl, success: function(){
        var identity = "x" + x.toString() + "y" + y.toString();
        $("#" + identity).css('backgroundColor', 'rgba(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ', ' + a.toString() + ')');  
      }});
    }