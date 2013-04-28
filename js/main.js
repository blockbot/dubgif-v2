(function($){
	
	var D = {
	
		imgIndex: 1,
		init:function(){
			
			$.ajax({
				url: "media.json",
				dataType: "json",
				success: function(data){

					if(window.location.hash){
						
						var imageMp3 = window.location.hash.replace(/^.*#/, '').replace(/\?.*$/, '').split("-");
						
						$("#images .active").attr("src", "gif2/" + data.media.images[imageMp3[0]]).css("height", $(window).height());
						$("#audio audio").attr("src", "mp3/" + data.media.mp3s[imageMp3[1]]);
						
					} else {
						
						var imageNum = Math.ceil(Math.random() * 47),
							mp3Num = Math.ceil(Math.random() * 22);
						
						$("#images .active").attr("src", "gif2/" + data.media.images[imageNum]).css("height", $(window).height());
						$("#audio audio").prop("volume" , 0.3);
						$("#audio audio").attr("src", "mp3/" + data.media.mp3s[mp3Num]);
						
					}
					D.controls(data);
					$("#images img").css("height", $(window).height());
					
					
					for(i=1;i<=data.media.imagesLength;i++){
						var gifLoader = new Image();
						
						gifLoader.src = "gif2/" + data.media.images[i];
						
						$("#images").append(gifLoader);
					}
					
					var count = 0,
						j = 0;

					(function imgLoop(i){
						
						// this skips building whatever slide has already been printed on load
						if(j === (D.imgIndex - 1)){

							j++
							i--
							if(i > 0){
								imgLoop(i);
							}
						
						// build the slides	
						} else {
							
							var gifLoader = new Image();

							gifLoader.src = data.media.images[i];

							$("#images").append(gifLoader);

							var imgLoaded = setInterval(function() {

								if (gifLoader.complete) {

									j++
									i--
									if(i > 0){
										imgLoop(i);
									}
									clearInterval(imgLoaded);
									
							    }

							}, 100);

							
						}
						
					})(count);
					
					
					
				},
				error:function(){
					console.log("slideshow ajax error");
				}
				
			});
			
			$(window).resize(function(){
				
				$("#images .active").css({"height" : $(window).height() , "width" : $(window).width()});
				
				
			});
		
			$(".url input").attr("value", window.location.href);
			
			function readyState(){
				D.social.init();
			};

			var readyChecks = 0,
				stateCheck = setInterval(function() {

				if (document.readyState === "complete") {
			        readyState();
			        clearInterval(stateCheck);
			    } else if(readyChecks > 20){
			        readyState();
			        clearInterval(stateCheck);
				}
				readyChecks++
			}, 100);
			
		},
		controls:function(data){
			
			$(".reload").click(function(){
				
				var imageNum = Math.ceil(Math.random() * 47),
					mp3Num = Math.ceil(Math.random() * 22);
					
				$("#images .active").attr("src", "gif2/" + data.media.images[imageNum]).css("height", $(window).height());
				$("#audio audio").attr("src", "mp3/" + data.media.mp3s[mp3Num]);
				
				window.location.hash = imageNum + "-" + mp3Num;
					
				console.log(Math.ceil(Math.random() * 47));
				
			});
			
			$(".link").click(function(){
				
				$(".url").toggle();
				
			});
			
		},
		social:{
			
			init:function(){
				D.social.facebook();
				D.social.twitter();
			},
			facebook:function(){
				(function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0];
				  if (d.getElementById(id)) return;
				  js = d.createElement(s); js.id = id;
				  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=415310475147711";
				  fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			},
			twitter:function(){
				!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
			}
			
		}
		
	}; D.init();
	
})(jQuery);
