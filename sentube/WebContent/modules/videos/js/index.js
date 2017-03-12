const display = (div,title,videos) => {
	 var length,id = "",limit=12;
	 var width = window.innerWidth;
	 limit = width >= 992 && width <= 1199 ? 10 : limit;
	 limit = width >= 640 && width <= 767 ? 8 : limit;
	 limit = width < 640 ? 4 : limit;
	 limit = width <= 360 ? 1 : limit;
	 length = videos.length;
	 for(var i=0;i<length;i++) id += i < length-1 ? videos[i].id +"," : videos[i].id;
	 app.get("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBaYaWQcSP8P1Dau3kxDitRo7W9VA4EOPg&id="+id+"&part=snippet,contentDetails,statistics", result => {
		length = result.items.length;
	    for(i=0;i<length;i++) {
	    	videos[i].index = i+1;
	    	const duration = result.items[i].contentDetails.duration.substring(2, result.items[i].contentDetails.duration.length).toLowerCase();
	    	const minutes = duration.substring(0, duration.indexOf('m'));
	    	const index = duration.indexOf('s');
			const seconds = index > 0 ? duration.substring(duration.indexOf('m')+1, index) : 0;
			videos[i].channel = result.items[i].snippet.channelTitle;
	    	videos[i].duration = (minutes.length  ? minutes : ("0"+minutes)) + " : " + (seconds.length > 1 ? seconds : ("0"+seconds));
	    	videos[i].viewCount = result.items[i].statistics.viewCount.replace(/\B(?=(\d{3})+\b)/g, ",");
	    }
	    const state = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) : {};
	    var index = state["panel_"+div.index()] ? state["panel_"+div.index()] : 0;
	    page.render(div,{title : title, videos : videos.slice(index,index+limit)},thumbnail => {
	    	if(index<limit) $(".video-nav-left",div).addClass("disabled");;
	    	if(index>=length-limit) $(".video-nav-right",div).addClass("disabled");
	    	$(".status",div).html((index+limit)+"/"+length);
	    	$(".video-nav-left",div).click(function(e) {
	    		if($(this).hasClass("disabled")) return false;
	    		const container = $("<div/>");
	    		$(".video-nav-right",div).removeClass("disabled");
	    		index-=limit;
	    		if(index<=0) $(".video-nav-left",div).addClass("disabled");;
	    		const top = $(window).scrollTop();
	    		page.render(div,{title : title, videos : videos.slice(index,index+limit)},false,container,() => {
	    	    	$("> div",div).remove();
	    	    	$("> div",container).insertAfter($(".status",div)).addClass("animated flip");
	    	    	$('html, body').animate({scrollTop : top},800);
	    	    	$(".status",div).html((index+limit)+"/"+length);
	    	    });
	    		state["panel_"+div.index()] = index;
	    		if(localStorage) localStorage.setItem("state",JSON.stringify(state));
	    	});
	    	if(length<=limit) $(".video-nav-right",div).addClass("disabled");
	    	$(".video-nav-right",div).click(function(e){
	    		if($(this).hasClass("disabled")) return false;
	    		$(".video-nav-left",div).removeClass("disabled");
	    		const container = $("<div/>");
	    		index+=limit;
	    		if(index>=length-limit) $(".video-nav-right",div).addClass("disabled");
	    		const top = $(window).scrollTop();
	    		page.render(div,{title : title, videos : videos.slice(index,index+limit)},false,container,() => {
	    	    	$("> div",div).remove();
	    	    	$("> div",container).insertAfter($(".status",div)).addClass("animated flip");
	    	    	$('html, body').animate({scrollTop : top},800);
	    	    	$(".status",div).html((index+limit)+"/"+length);
	    	    });
	    		state["panel_"+div.index()] = index;
	    		if(localStorage) localStorage.setItem("state",JSON.stringify(state));
	    	});
	    	$(".playall",div).click(function(e){
	    		if(localStorage) localStorage.setItem("videos",JSON.stringify(videos));
	    	});	
	    	div.fadeTo(1000,1);
	    	$("div",thumbnail).addClass("animated flip");
	    });
	 },true);
 };
 
 document.addEventListener("DOMContentLoaded", () => {
	 var videos = new Array();
	 videos.push({id : "BGt1htuyhiU", title : "Youssou Ndour - Be careful"});
	 videos.push({id : "KlE8MlCWgmI", title : "Viviane Chidid - No Stress"});
	 videos.push({id : "a-B4Q5_I_mI", title : "Cheikh Lo - Degg Gui"});
	 videos.push({id : "j2Tj_ejWQf0", title : "Pape Diouf - Du Degn"});
	 videos.push({id : "NKttmg7NnVw", title : "Dip Doundou Guiss - Deug Deug"});
	 videos.push({id : "-IPOGQ56-pc", title : "Keur Gui - Diogoufi"});
	 videos.push({id : "cHjiBgNF9GY", title : "NITDOFF - Nattu Dou Wess"});
	 videos.push({id : "unYEZlYsoSY", title : "Fou Malade - Senegal"});
	 videos.push({id : "0ChaoRFyytA", title : "Titi - Guen Gui Deuk"});
	 videos.push({id : "6ehfmdRb_uE", title : "Elage DIOUF - Demone Na"});
	 videos.push({id : "O1ClYEM43d4", title : "Queen Biz - Eksina"});
	 videos.push({id : "suatQi7iAyc", title : "Philip Monteiro - Name na la"});
	 videos.push({id : "g6QrXwGUqAM", title : "Wally Seck - Stay"});
	 videos.push({id : "ymgO2OZQZfw", title : "Sidiki Diabate - Fais moi confiance"});
	 videos.push({id : "TBWsEjFFD6k", title : "Thione Seck - Diaga"});
	 videos.push({id : "rmc1nuaX0Yw", title : "Pape & Cheikh - Lonkotina"});
	 videos.push({id : "HeFpnYKGXMk", title : "Coumba Gawlo - Topma"});
	 videos.push({id : "7lENHksMvXM", title : "Safari - Fat Ndiaye Coumba Anta"});
	 videos.push({id : "Km0Ums-d8N0", title : "Nafina - Lane Ngay Khar"});
	 videos.push({id : "VzB5n6Tw-xs", title : "Ami Colle Dieng - Fans Yi"});
	 videos.push({id : "m-xrL7PkU4w", title : "Amina - Feksima"});
	 videos.push({id : "TxyhI0CDG-I", title : "Alioune Mbaye Nder - Maladie d'Amour"});
	 videos.push({id : "-m7DJ607tU4", title : "Malouida - Wadji demna"});
	 videos.push({id : "FwBeLCLMa1s", title : "Adiouza Diallo - Cey Love"});
	 videos.push({id : "r0WTxbFOjco", title : "Momo Dieng - Lang gui"});
	 videos.push({id : "SyJWbN7tGbg", title : "Abou Thioubalo - Solution"});
	 videos.push({id : "0vnXBFjolGE", title : "Sidy Samb - Djoubo"});
	 videos.push({id : "R08rX2-sTuE", title : "Faada Freddy - We Sing In Time"});
	 videos.push({id : "esU9NnHP2aE", title : "Canabasse - Na Gnou Dem"});
	 videos.push({id : "doIYcuBkKtM", title : "Fata - Decouverte"});
	 videos.push({id : "_iLU1DVUH9k", title : "Awadi & Duggy Tee - Merci Mon Dieu"});
	 videos.push({id : "evin2iPw6-0", title : "Gaston - La Foi"});
	 videos.push({id : "4U8MZVv1Q88", title : "Fatou Guewel - Santati"});
	 videos.push({id : "vm5ESSrgz98", title : "Djibril Diop - Ki la tete"});
	 videos.push({id : "s6mkbNnpgVw", title : "Gokh Bi System - Yaye"});
	 videos.push({id : "LyG0NPXGqKo", title : "Abiba - Sama mother"});
	 videos.push({id : "VnTyGAmDJXo", title : "Carlou D - Sagn Sagn"});
	 videos.push({id : "G9VGqcEIi_g", title : "Souleymane faye - JELEETI"});
	 videos.push({id : "QF6UsqvrxEA", title : "Mbaye Dieye Faye - Puissance"});
	 videos.push({id : "EhDOvtQKXrk", title : "Ngaaka Blinde - Deff Buzz"});
	 videos.push({id : "feRQdSg1rpw", title : "Suadu - Celebrate"});
	 videos.push({id : "hs6qelc8YtU", title : "Bideew Bou Bess - I Belong"});
	 videos.push({id : "AqU-432JrRU", title : "Big D - Let's Go !!!"});
	 videos.push({id : "9bDLVWtPa8k", title : "Nix - Zik des gentlemen"});
	 videos.push({id : "gGfuwgYE7Ho", title : "Freestyle - Show me"});
	 videos.push({id : "isdWSKnSSyE", title : "Safari - Art Bi"});
	 videos.push({id : "cgFENtRBWsU", title : "Deesse Major - Gem Sa Bop"});
	 videos.push({id : "Fjba4g93UX8", title : "HAKILL - Def saRAP"});
	 display($(".videos:eq(0)"),"Senegal",videos);
	 videos = new Array();
	 videos.push({id : "xSauTBKoOqE", title : "Empire Of The Sun - Celebrate"});
	 videos.push({id : "MEkS_mQ0GlI", title : "Kerli - Zero Gravity"});
	 videos.push({id : "m_8f9BwFZ4k", title : "Stan Walker - Music Won't Break Your Heart"});
	 videos.push({id : "KJBHdKBOdcw", title : "Future, Miley Cyrus, Mr Hudson - Real and True"});
	 videos.push({id : "qFLhGq0060w", title : "The Weeknd, Daft Punk - I Feel It Coming"});
	 videos.push({id : "7wtfhZwyrcc", title : "Imagine Dragons - Believer"});
	 videos.push({id : "J5qWnG5RQTk", title : "Train - Play That Song"});
	 videos.push({id : "n0FOPTYJPXw", title : "Disclosure, Mary J. Blige - F For You"});
	 videos.push({id : "TxEVPe7XMcs", title : "Take That - Love Love"});
	 videos.push({id : "GaWXA5e0YTQ", title : "Willy Moon - Yeah Yeah"});
	 videos.push({id : "t5Sd5c4o9UM", title : "Katy Perry, Kanye West - E.T"});
	 videos.push({id : "163_C5UVU-I", title : "Paul McCartney - Hope For The Future"});
	 videos.push({id : "7F37r50VUTQ", title : "ZAYN, Taylor Swift - I Don't Wanna Live Forever"});
	 videos.push({id : "jrWIqrGhfwI", title : "Vaults - Lifespan"});
	 videos.push({id : "LBr7kECsjcQ", title : "Fall Out Boy - Centuries"});
	 videos.push({id : "dwfKZ-1jyiw", title : "Kelly Rowland - Commander"});
	 videos.push({id : "jZhQOvvV45w", title : "OneRepublic - Good Life"});
	 videos.push({id : "OmVOwlnYDuo", title : "Republica Rock - Life Goes On"});
	 videos.push({id : "qh7BCluk3wc", title : "Gallant - Weight In Gold"});
	 videos.push({id : "Ow_qI_F2ZJI", title : "Bring Me The Horizon - Throne"});
	 videos.push({id : "uPHKkewD1G0", title : "Daya - Sit Still, Look Pretty"});
	 videos.push({id : "PTOFEgJ9zzI", title : "Jessie J - Masterpiece"});
	 videos.push({id : "Y7rAybRza4c", title : "The Coral - Holy Revelation"});
	 videos.push({id : "YYxzRYMrcVc", title : "Busta Rhymes - We Made It"});
	 videos.push({id : "7qrRzNidzIc", title : "Breaking Benjamin - I Will Not Bow"});
	 videos.push({id : "HWYf4PBAmfA", title : "Fatherson - Just Past the Point of Breaking"});
	 videos.push({id : "lL2ZwXj1tXM", title : "Three Days Grace - Never Too Late"});
	 videos.push({id : "Um7pMggPnug", title : "Katy Perry - Chained To The Rhythm"});
	 videos.push({id : "k-a2jQbXY5Q", title : "Kesington Kross - Gimme Your Love"});
	 videos.push({id : "NmCFY1oYDeM", title : "John Legend - Love Me Now"});
	 videos.push({id : "nUCoYcxNMBE", title : "Eric Prydz - Generate"});
	 videos.push({id : "_Mllnmx6TM0", title : "The Amazons - Stay With Me"});
	 videos.push({id : "Pn-6eOxnEMI", title : "A Day To Remember - All I Want"});
	 videos.push({id : "-uitU1ndO3s", title : "You Me At Six - Night People"});
	 videos.push({id : "eQWG8BVeryU", title : "Chris Brown - Turn Up the Music"});
	 videos.push({id : "lfEVLXu3NXs", title : "David Zowie - House Every Weekend"});
	 videos.push({id : "LXrP66ot0zs", title : "Jason Aldean - Lights Come On"});
	 videos.push({id : "fgXRzjlbbng", title : "Jordan Smith - Stand In The Light"});
	 videos.push({id : "ZgbmDMNu42s", title : "Scorpions - We Built This House"});
	 videos.push({id : "tqUbLtwdXPA", title : "A Great Big World - Oasis"});
	 videos.push({id : "lwObaOnEu4A", title : "Marcus & Martinus - Light It Up"});
	 videos.push({id : "6x26O237kP8", title : "Editors - All Sparks"});
	 videos.push({id : "VRNPkJ0ELPc", title : "Within Temptation - Whole World is Watching"});
	 videos.push({id : "AQ4MQ_uhBSs", title : "Jonas Blue - By Your Side"});
	 videos.push({id : "a_YR4dKArgo", title : "Selena Gomez - Naturally"});
	 videos.push({id : "S0qrinhNnOM", title : "SOLANGE - CRANES IN THE SKY"});
	 videos.push({id : "BaF-pGyKaOg", title : "Jhene Aiko - Spotless Mind"});
	 videos.push({id : "4HazJhPnrB8", title : "Alicia Keys - In Common"});
	 display($(".videos:eq(1)"),"International",videos);
 });