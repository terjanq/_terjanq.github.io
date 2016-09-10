(function() {

      window.addEventListener("load", function(){


        setTimeout(function(){

            MAX_ZOOM = 10000;
            //BLOCKS_ON_SCREEN = 10000;
            USERNAME_SIZE = 6;
        }, 2000);


        document.body.addEventListener("mousewheel", WheelHandler, true);

       function WheelHandler(event) {
           var zoom = BLOCKS_ON_SCREEN * Math.pow(0.93, event.wheelDelta / 120 || event.detail || 0);
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
        myDiv.innerHTML = "terjanq.github.io/splix.io";


        leaderboard.parentNode.insertBefore(myDiv, leaderboard.nextSibling);



        var observerConfig = { attributes: true, attributeFilter: ['style'] };



         var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if(mutation.type == "attributes" && mutation.attributeName == "style" && mutation.target === leaderboard) {
              myDiv.style.cssText = leaderboard.style.cssText + ";" + myCssText;
            }
          });
        });

       observer.observe(leaderboard, observerConfig);


        var paused = false;
        var loop = setInterval(function(){
                if(paused) {
                    sendDir((myPlayer.dir + 1)%4);
                }
            }, 100);

        window.addEventListener("keyup", function(e){
            if(e.keyCode == 80) paused ^= true;
        });

        ga('create', 'UA-78233995-2', 'auto', 'ter');
        ga('ter.send', 'pageview', '/chrome');




    });
  })();