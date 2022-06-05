

    var titleLeft = document.getElementById("titleLeft");
    var titleRight = document.getElementById("titleRight");
    /*
    -1 – unstarted
    0 – ended
    1 – playing
    2 – paused
    3 – buffering
    5 – video cued
    */
    //if player is paused, pause the vinyl animation
    function pauseV(player, vinyl) {
        if(player)
        {
            if (player.getPlayerState() == 2 || player.getPlayerState() == 0 || player.getPlayerState() == -1 || player.getPlayerState() == 5  ) { 
                vinyl.style.animationPlayState = 'paused';
            } else {
                vinyl.style.animationPlayState = 'running';
                
            }
        }
        

        
    }

    // cut a string to a desired length,
    // if
    function cutString(string, size) {
        let cut="";
        let aposiopesis = false;
        for(let i =0; i<size; i++){   
            let l = string[i];

            if (l != null) {
                cut += l;
                aposiopesis = true;
            }        
            else if( l == null) {
                cut += "";
                aposiopesis = false;
            }
            
        }

        if(aposiopesis == true){
            cut+= '...'
        }

        return cut;
    }

    function setTitle(player, titleElement) {
        let titlev = player.getVideoData().title
        if(titlev.length > 42){
            let cut = cutString(titlev, 42);

            titleElement.innerHTML = cut
        }
        else{
            titleElement.innerHTML = titlev
        }
    }
 
    async function updateTitle(player, titleElement) {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 500));
        
            if (player.getPlayerState() == 1) {
                setTitle(player, titleElement)
            

                let titlev = titleElement.innerHTML
            
                    
                    for (let index = 0; index < titlev.length; index++) {
                        var randomColor = Math.floor(Math.random()*16777215).toString(16);
                        
                        let x = titlev.substring(0,index)
                        let y = titlev.charAt(index)
                        let z = titlev.substring(index+1)
                        if (x != " " && y != " " && z != " ") {
                            
                        
                            let anim= x +"<span style = \"color:#"+randomColor+"\">" +y+"</span>" + z;
                            
                            await new Promise(resolve => setTimeout(resolve, 500));
                            
                            titleElement.innerHTML = anim;                                        
                        }
                    }
            
            
            //updateTitle(player, titleElement)
            }
            else{
                setTitle(player, titleElement)
                    
            }
        }    
    }

    


    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player1;
    var player2;
    function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('playerLeft', {
        height: '190',
        width: '338',
        videoId: session0,//'{{session[0]}}',
        playerVars: {
        'playsinline': 1
        },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });

    player2 = new YT.Player('playerRight', {
        height: '190',
        width: '338',
        videoId: session1,//'{{session[1]}}',
        playerVars: {
        'playsinline': 1
        },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
        });

    

    }    

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {

        pauseV(player1, vinyl1);
        pauseV(player2, vinyl2); 

        updateTitle(player1, titleLeft);
        updateTitle(player2, titleRight);
        
    

    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
   // var done = false;
    function onPlayerStateChange(event) {
        pauseV(player1, vinyl1);
        pauseV(player2, vinyl2);    
            
        


    }

    function stopVideo() {
        player1.stopVideo();
        player2.stopVideo();
    }



    

    var btnPlayL = document.getElementsByName("playLbtn");
    //var btnPlayR = document.getElementsByName("playRbtn");

    var slider = document.getElementById("slider");
    var sliderLeft = document.getElementById("sliderLeft");
    var sliderRight = document.getElementById("sliderRight");
    var mute1 = document.getElementById("mute1");
    var mute2 = document.getElementById("mute2");
    var pb1plus = document.getElementById("pb1plus");
    var pb1minus = document.getElementById("pb1minus");
    var pb1text = document.getElementById("pb1text");
    var pb2plus = document.getElementById("pb2plus");
    var pb2minus = document.getElementById("pb2minus");
    var pb2text = document.getElementById("pb2text");

    var hide1 = document.getElementById("hide1");
    var show1 = document.getElementById("show1");
    var hide2 = document.getElementById("hide2");
    var show2 = document.getElementById("show2");

    var vinyl1 = document.getElementById("vinyl1");

    var btnUrl1 = document.getElementById("btnUrl1");
    var btnUrl2 = document.getElementById("btnUrl2");

    var currentTime = document.getElementById("current");
    var durationTime = document.getElementById("duration");

    

    var id1 = "{{session[0]}}";
    var id2 = "{{session[1]}}";

    // send session info (left video id and right video id) to flask
    

    //function delay(time) {
   //     return new Promise(resolve => setTimeout(resolve, time));
   // }


    gapi.load("client", loadClient);
    
    function loadClient() {
        gapi.client.setApiKey("APIKEY");
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            .then(function() { console.log("GAPI client loaded for API"); },
                    function(err) { console.error("Error loading GAPI client for API", err); });
    }

    function searchYoutube(keyword) {
        const searchString = keyword;
        const maxresult = 6;
        //const orderby = orderInput.value;
        var number = 0;

        var arr_search = {
            "part": 'snippet',
            "type": 'video',
            "order": 'relevance',
            "maxResults": maxresult,
            "q": searchString
        };
      
       // if (pageToken != '') {
        //    arr_search.pageToken = pageToken;
        //}
      
        return gapi.client.youtube.search.list(arr_search)
        .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            const videoList = document.getElementById('videoListContainer');
            const listItems = response.result.items;
            console.log(listItems);
            let output = '<div class=\"flex flex-col space-y-4 \">';
            if (listItems) {
            
                listItems.forEach(item => {
                    switch (number){
                        case 0:
                            output+= "<div class=\"flex flex-row space-x-4\">"
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            output += "</div>"
                            output += "<div class=\"flex flex-row space-x-4\">"
                            break;
                        case 4:
                            
                            break;
                        case 5:
                            break;
                        case 6:
                            output += "</div>"
                            output += "<div class=\"flex flex-row space-x-4\">"
                            break;
                        case 7:
                            break;
                        case 8:
                            break;
                        case 9:
                            output += "</div>"
                            break;
                    }
                    
                    number +=1;

                    const videoId = item.id.videoId;
                    const videoTitle = cutString(item.snippet.title, 53) ;
                  //https://img.icons8.com/ios-glyphs/344/play--v1.png

                  //<input type="image"  class="overlay z-[60]" style="filter: opacity(0%); width: 300px; height:211px; position: absolute; clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%);" src="static/css/playL.png" data-videoId="${videoId}" id="playLbtn"  />
                  //<input type="image" class="overlay z-[60]" style="filter: opacity(0%); width: 300px; height:211px; position: absolute; clip-path: polygon(0 0%, 50% 0%, 50% 50%, 50% 100%, 0% 100%);" src="static/css/playR.png"  id="playRbtn"  />
                    output += `
                        <div class="text-base font-bold text-white overflow-hidden text-center w-[302px] h-[260px] rounded border border-white">
                            <div class="flex flex-row  z-[100]  ">
    
                                <div id="${videoId}" class="pointer z-[60] "> <img class="overlay " onclick="PlayRight(this)"   src="static/css/playR.png" style="filter: opacity(0%); width: 300px; height:211px; position: absolute; clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%);"  >  </div>                   
                                <div id="${videoId}" class="pointer z-[60] "> <img class="overlay " onclick="PlayLeft(this)" src="static/css/playL.png" style="filter: opacity(0%); width: 300px; height:211px; position: absolute;  clip-path:  polygon(0 0%, 50% 0%, 50% 50%, 50% 100%, 0% 100%);"  >  </div>
                            
                                
                                
                                <div class="z-[50] "> <img  style="width: 300px; height:211px; position: absolute;  "  src="http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg" >  </div>
                                
                                
                            </div>
                            
                        </a><p class="mt-[210px]" >${videoTitle}</p>

                        </div>
                        `;
                });
         
                
                output += "</div>"
                // Output list
                videoList.innerHTML = output;
            }
            
        },
        function(err) { console.error("Execute error", err); });
    }



    //extract video id from a url
    function youtube_parser(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return null;
        }
    }

    //activate overlays
   /* function onMouseOver(event){
        let t = event.target;
        t.classList.add('overlay');
    }
    function onMouseOut(event){
        let t = event.target;
        t.classList.remove('overlay');
    }*/


    function sendSessionInfo(id1, id2) { 
        if (id1 == "{{session[0]}}" || id1 == "{{session[1]}}") {
            var sessionInfo = {
                //'user_id': from flask
                'left_id': null,
                'right_id': id2         
            }  
            
        }
        else if (id2 == "{{session[0]}}" || id2 == "{{session[1]}}") {
            var sessionInfo = {
                //'user_id': from flask       
                'left_id': id1,
                'right_id': null
            }  
            
        }
        else{
            var sessionInfo = {
                //'user_id': from flask
                'left_id': id1,
                'right_id': id2
            }  
            
        }

       

        let s = JSON.stringify(sessionInfo); // convert to json string

        $.ajax({
            url:"/session",
            type:"POST",
            contentType: "application/json",
            data: JSON.stringify(s)});
    }
    



  
    function PlayLeft(element) { 
        var parent = element.parentNode;
        
        console.log(parent.id)
  
        id1 = parent.id

        player1.cueVideoById({
            videoId: id1,
            startSeconds: 0       
          });     
          
        sendSessionInfo(id1, id2);
          
    }

    function PlayRight(element) { 
        var parent = element.parentNode;
        
        console.log(parent.id)

        id2 = parent.id
  
        player2.cueVideoById({
            videoId: id2,
            startSeconds: 0       
          });          
          
        sendSessionInfo(id1, id2);  
    }

    
    
    

    btnUrl1.addEventListener("click", function(){
        var url = document.getElementById("url").value.trim();

        // if the user enters a search keyword, send it to flask
        if (url.length < 30) {
            searchYoutube(url)
        }
        else{  // else consider it a url and play that video
            id1 = youtube_parser(url)
            
            player1.cueVideoById(id1);
            
            document.getElementById("url1").value = " ";

            sendSessionInfo(id1, id2);
            updateTitle(player1, titleLeft);    
        }    
    });

    btnUrl2.addEventListener("click", function(){
        var url = document.getElementById("url").value.trim();    
        
        if (url.length < 30) {
            searchYoutube(url)
        }
        else{           
            id2 = youtube_parser(url)
            
            player2.cueVideoById(id2);
            
            document.getElementById("url2").value = " ";
            
            sendSessionInfo(id1, id2);
            updateTitle(player2, titleRight);
        }     
    });


    
////////////////////playbackspeed/////////////////////////////////
    var playbackrate = 1;
    pb1plus.addEventListener("click", function(){
        playbackrate+=0.05;

        if (playbackrate <0) {
            playbackrate = 0.1;
        }
        else if(playbackrate > 3) {
            playbackrate = 3;
        }

        player1.setPlaybackRate(playbackrate); //change video speed
        vinyl1.style.animationDuration = 5000/playbackrate+"ms"; //change vinyl speed
        pb1text.innerHTML= playbackrate.toFixed(2);
    });

    pb1minus.addEventListener("click", function(){
        playbackrate-=0.05;

        if (playbackrate <0) {
            playbackrate = 0.1;
        }
        else if(playbackrate > 3) {
            playbackrate = 3;
        }

        player1.setPlaybackRate(playbackrate); //change video speed
        vinyl1.style.animationDuration = 5000/playbackrate+"ms"; //change vinyl speed
        pb1text.innerHTML= playbackrate.toFixed(2);
    });

///////

    var playbackrate2 = 1;
    pb2plus.addEventListener("click", function(){
        playbackrate2+=0.05;

        if (playbackrate2 <0) {
            playbackrate2 = 0.1;
        }
        else if(playbackrate2 > 3) {
            playbackrate2 = 3;
        }

        player2.setPlaybackRate(playbackrate2); //change video speed
        vinyl2.style.animationDuration = 5000/playbackrate2+"ms"; //change vinyl speed
        pb2text.innerHTML = playbackrate2.toFixed(2);
    });

    pb2minus.addEventListener("click", function(){
        playbackrate2-=0.05;

        if (playbackrate2 <0) {
            playbackrate2 = 0.1;
        }
        else if(playbackrate > 3) {
            playbackrate2 = 3;
        }

        player2.setPlaybackRate(playbackrate2); //change video speed
        vinyl2.style.animationDuration = 5000/playbackrate2+"ms"; //change vinyl speed
        pb2text.innerHTML = playbackrate2.toFixed(2);
    });

////////////////////playbackspeed/////////////////////////////////
   

////////////////////mute/////////////////////////////////

    mute1.addEventListener("click", function(){
        if (player1.isMuted()) {
            player1.unMute();
            show1.classList.remove("hidden");
            hide1.classList.add("hidden");
            //vinyl1.classList.remove("pause");
            
        }
        else{
            player1.mute();
            show1.classList.add("hidden");
            hide1.classList.remove("hidden");
           // vinyl1.classList.add("pause");
           
        }    
        
    });

//////

    mute2.addEventListener("click", function(){
        if (player2.isMuted()) {
            player2.unMute();
            show2.classList.remove("hidden");
            hide2.classList.add("hidden")
        }
        else{
            player2.mute();

            show2.classList.add("hidden");
            hide2.classList.remove("hidden")
        }    
        
    });

////////////////////mute/////////////////////////////////    


    var maxvolLeft = 100;
    var maxvolRight = 100;

    function setAndCalcVolume() {
        sliderval = slider.value

        var p1vol = Math.abs(sliderval - 100)
        var p2vol = sliderval
        

        if ((p1vol <= maxvolLeft)) {
            player1.setVolume(p1vol);
        } else {
            player1.setVolume(maxvolLeft)
        }

        if (p2vol == 7 || p2vol == 8 || p2vol == 9) {
            player2.setVolume(p2vol);
        }
        else if ((p2vol <= maxvolRight)) {
            player2.setVolume(p2vol);
        } else {
            player2.setVolume(maxvolRight)
        }
    }

    slider.addEventListener("input", function(){
        setAndCalcVolume();
        
    });

    sliderLeft.addEventListener("input", function(){
        maxvolLeft = sliderLeft.value;
        setAndCalcVolume();

    });

    sliderRight.addEventListener("input", function(){
        maxvolRight = sliderRight.value;
        setAndCalcVolume();
    });

    //const img = document.getElementById("vinyl1")

    //these lines disable vinyl images drag properties
    vinyl1.ondragstart = () => {
    return false;
    };
    vinyl2.ondragstart = () => {
    return false;
    };

  
