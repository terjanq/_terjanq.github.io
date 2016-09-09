(function() {

  console.log("co jest");

    window.addEventListener("load", function(){

      ga('create', 'UA-78233995-2', 'auto', 'terjanq');
      ga('terjanq.send', 'pageview', '/chrome');

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



      var paused = false;
      var loop = setInterval(function(){
              if(paused) {
                  sendDir((myPlayer.dir + 1)%4);
              }
          }, 100);

      window.addEventListener("keyup", function(e){
          if(e.keyCode == 80) paused ^= true;
      });





  });
})();