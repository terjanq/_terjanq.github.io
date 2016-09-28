(function() {

      window.addEventListener("load", function(){

        var game = {};

        setTimeout(function(){

            MAX_ZOOM = 10000;
            //BLOCKS_ON_SCREEN = 10000;
            USERNAME_SIZE = 6;
        }, 2000);



        var mouseWheelEvt= ((/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel");

        document.body.addEventListener(mouseWheelEvt, WheelHandler, true);

       function WheelHandler(event) {
           var zoom = BLOCKS_ON_SCREEN * Math.pow(0.93, event.wheelDelta / 120 || -event.detail || 0);
           if(zoom < 100) BLOCKS_ON_SCREEN = 100;
           else if(zoom > 16000) BLOCKS_ON_SCREEN = 16000;
           else BLOCKS_ON_SCREEN = zoom;
        }


        var leaderboard = document.getElementById("leaderboard");
        leaderboard.style.top = "48px";
        var myCssText = "color:white; font-weight: 700; position:fixed; right:  13px; top: 8px; z-index:100; padding: 5px 10px; opacity: .7; transform-orign: right top;";

        var myDiv = document.createElement("div");
        myDiv.className  = "greenBox";
        myDiv.style.cssText = myCssText;
        myDiv.innerHTML = "terjanq.github.io/splix";


        leaderboard.parentNode.insertBefore(myDiv, leaderboard.nextSibling);

        uiElems.push(myDiv);


        var paused = false;
        var loop = setInterval(function(){
                if(paused) {
                    sendDir((myPlayer.dir + 1)%4);
                }
            }, 100);

        window.addEventListener("keyup", function(e){
            if(e.keyCode == 80) paused ^= true;
        });

        var nameForm = document.getElementById("nameForm");
        var myBox = document.createElement("div");
        var br = document.createElement("br");


        nameForm.insertAdjacentHTML("beforeEnd", "<br><select style='float:left; margin-top: 20px; background:#bdf7c4' id='_servers' class='fancyBox'><option selected value='#'>Loading servers...</option></select>");


        var interval;

        var hashes = [];

        window.searchServersRecursive = function(obj, ping){
           if(obj && obj.hash) {
                  hashes.push({hash: obj.hash, ping: ping});
                  return;
           }
           if(Array.isArray(obj)) for(var i=0; i<obj.length; i++) searchServersRecursive(obj[i], ping);
           else {
              var arr = Object.getOwnPropertyNames(obj);
              if(arr[0] == "0") return;
              for(var i=0; i<arr.length; i++) {
                if(Array.isArray(obj[arr[i]])) searchServersRecursive(obj[arr[i]], ping);
              }
            }
        };


        function no0(){
          for (var i=0; i<window.servers.length; i++){
            if(window.servers[i].avgPing === 0) return false;
          }
          return true;
        }

        interval = setInterval(function(){
          if(window.servers.length > 0 && no0()) {
            clearInterval(interval);
            var no = 1 ;
            var options = "<option>Select server</option>";

            for(var i=0; i<servers.length; i++) searchServersRecursive(servers[i], servers[i].avgPing);

            hashes.sort(function(a, b){return a.ping - b.ping });

            for(var i=0; i<hashes.length; i++)
                  options += "\n<option value='#"+hashes[i].hash+"'>"+(no++)+". #" + hashes[i].hash + " ( " + hashes[i].ping + " )</option>";

            document.getElementById("_servers").innerHTML = options;
            if(window.location.hash.indexOf("#") != -1) document.getElementById("_servers").value = window.location.hash;
          }

        },100);

        var myStyle = (function() {
              var style = document.createElement("style");
              style.appendChild(document.createTextNode(""));
              document.head.appendChild(style);
              return style;
        })();

        var cssRules = document.styleSheets[0]["cssRules"];
        for(var i=0; i<cssRules.length; i++){

            if(cssRules[i].cssText.indexOf("#nameInput")!=-1) {

              var rule = "#_servers" + cssRules[i].cssText.match(/{.*}/)[0];
              rule = rule.replace("-webkit-appearance: none;", "");
              myStyle.sheet.insertRule(rule, 0);
           }
        }



        document.getElementById("_servers").onchange = function(){
          window.location.assign(document.getElementById("_servers").value);
        };



        var _showBegin = showBegin;
        var _hideBegin = hideBegin;


        window.showBegin = function(){
          if(window.location.hash.indexOf("#") != -1) document.getElementById("_servers").value = window.location.hash;
          _showBegin();
        };


        ga('create', 'UA-78233995-2', 'auto', 'ter');
        ga('ter.send', 'pageview', '/chrome');




    });
  })();