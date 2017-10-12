$(function(){
	//classif
	$.ajax(
		{
		type:"get",
		url:"mock/classify.json",
		dataType:"json",
		success:function(data){
			classify();
			function classify(){
				var str="";
				for(var i=0;i<data.length;i++){
					var list="";
					for(var j=0;j<data[i].list.length;j++){
						list+="<a href='##'>"+data[i].list[j]+"</a>";
					}
					var more_list="";
					for(var k=0;k<data[i].more_list.length;k++){
						more_list+="<a href='##'>"+data[i].more_list[k]+"</a>";
					}
					str+=`<li>
							<div class="li-link">
								<p><a href="##">${data[i].tit}</a></p>
								${list}
							</div>
							<div class="li-box">
								${more_list}
							</div>
						</li>`
				}
				$("#classif").html(str);
			}
		}
	});
	
	//轮播图
	$('#list>li').width($(window).width())//获取当前页面宽度，设置轮播图宽度为全图
//	banner()      //开关轮播图
	function banner(){
		var obanner = $('#banner');//整体
		var oList = $('#list');//ul
		var aLi = $('#list>li');//li图片
		var dir = $(".direction")
		var aA = $('.direction>a');//左右按钮
		var oBtn = $('.btn');
		var aCircel = $('.btn>a');//小圆点
		
		var iNow = 0;
		//设置ul的宽度
		var li = oList.children().eq(0).clone();
		oList.append(li);
		var aLi = $('#list>li');//再次获取li图片
		aLi.width($(window).width()) //获取当前页面宽度，设置轮播图宽度为全图
		oList.width(aLi.length*aLi.eq(0).outerWidth());
		//设置banner的宽度
		obanner.width(aLi.eq(0).outerWidth());
	
		//左
		aA.eq(0).click(function(){
			if(iNow==0){
				
				iNow=aLi.length-1;
				oList.css("left",iNow*-aLi.eq(0).outerWidth());
			}
			iNow--;
			toImg();
		})
			
		
		//右
		aA.eq(1).click(function(){
			iNow++;
			toImg();
		})
	
		//移入停止 并显示左右切换按钮
		obanner.mouseover(function(){
			clearInterval(timer)
			dir.css("display","block");
		})
		
		//移开运行 并隐藏左右切换按钮
		obanner.mouseout(function(){
			timer = setInterval(function(){
				 iNow++;
				 toImg()
			},2000)
			dir.css("display","none");
		})
		
		//自动轮播
		timer = setInterval(function(){
			 iNow++;
			 toImg()
		},2000)
	
		//小圆点切换
		function tab(){
			for(var i=0;i<aCircel.length;i++){
				aCircel.eq(i).removeClass('active');
			}
			aCircel.eq(iNow==aLi.length-1?0:iNow).addClass('active');
		}
		
		//小圆点悬停切换
		for(var j=0;j<aCircel.length;j++){
			aCircel.eq(j).mouseover(function(){
				iNow=$(this).index();
				tab();
				oList.stop(true).animate({left:iNow*-aLi.eq(0).outerWidth()},500)
			})
		}
	
		//图片轮播
		function toImg(){
			if(iNow==aLi.length){
				iNow=1
				oList.css("left",0);
			}
			console.log(iNow);
			tab()
			oList.stop(true).animate({left:iNow*-aLi.eq(0).outerWidth()},500)
		}
	}
	
	//new_project
	$.ajax(
		{
		type:"get",
		url:"mock/new_project.json",
		dataType:"json",
		success:function(data){
			newproject();
			function newproject(){
				var str=`<div class="ad"></div>`;
				for(var i=0;i<data.length;i++){
					str+=`<li>
								<a href="##">
									<dl>
										<dt>${data[i].tit}</dt>
										<dd>
											<p>${data[i].introduce}</p>
											<img src="${data[i].img}"  />
										</dd>
									</dl>
								</a>
							</li>`;
				}
				$(".new_project_link").html(str);
			}
		}
	});
	
	//ranking
	$.ajax(
		{
		type:"get",
		url:"mock/ranking.json",
		dataType:"json",
		success:function(data){
			ranking();
			function ranking(){
				var str=`<h4>销量排行</h4>`;
				for(var i=0;i<data.length;i++){
					str+=`<li>
							<em>${data[i].num}</em>
							<a href="##"><img src="${data[i].img}"/></a>
							<p><a href="##">${data[i].name}</a></p>
							<span>${data[i].price}</span>
						</li>`;
				}
				$(".ranking").html(str);
			}
		}
	});
	
	//floor
	$.ajax(
		{
		type:"get",
		url:"mock/floor.json",
		dataType:"json",
		success:function(data){
			floor();
			function floor(){
				var str="";
				for(var i=0;i<data.length;i++){
					var ftit="";
					ftit+=`<h2>
								<span>${data[i].f_num}</span>
								<b>${data[i].f_name}</b>
							</h2>`;
							
					var fbtn="";
					for(var j=0;j<data[i].f_btn.length;j++){
						fbtn+=`<a href="##" class="f_btn">${data[i].f_btn[j]}</a>`
					}
					var fli="";
					for(var k=0;k<data[i].f_list.length;k++){
						fli+=`<li>
								<a href="##">
									<img src="${data[i].f_list[k].img}"/>
									<p>${data[i].f_list[k].name}</p>
									<b>${data[i].f_list[k].price}</b><del>${data[i].f_list[k].del}</del>
									<div class="add_cart">加入购物车</div>
								</a>
							</li>`
					}
					
					str+=`<div class="floor">
							<div class="f_l">
								<div class="ftitle">
									${ftit}
								</div>
								
								<div class="f_btn_box">
									${fbtn}
								</div>
								
								<a href="##" class="adp">
									<img src="${data[i].f_img}"/>
								</a>
							</div>
							
							<ul class="f_r">
								${fli}
							</ul>
						</div>`;
				}
				$(".allfloor").html(str);
			}
		}
	});
	
	
	
})
