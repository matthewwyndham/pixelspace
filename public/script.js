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
      var x = document.getElementById('form-x').value;
      var y = document.getElementById('form-y').value;
      var r = document.getElementById('form-r').value;
      var g = document.getElementById('form-g').value;
      var b = document.getElementById('form-b').value;
      var a = document.getElementById('form-a').value;
      var n = document.getElementById('form-name').value;
      var addurl = "/add?x=" + x.toString() + "&y=" + y.toString() + "&r=" + r.toString() + "&g=" + g.toString() + "&b=" + b.toString() + "&a=" + a.toString() + "&username=" + n.toString();
      $.ajax({url: addurl, success: function(){
        var identity = "x" + x.toString() + "y" + y.toString();
        $("#" + identity).css('backgroundColor', 'rgba(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ', ' + a.toString() + ')');  
      }});
    }