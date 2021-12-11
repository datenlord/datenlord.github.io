function isIE() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    if (isIE) {
        document.getElementById('tipModel').style.display = "block";
    } else {
        document.getElementById('tipModel').style.display = "none";
    }
}
function getJobList(jsonPath) {
    $.ajax({
        url: jsonPath, //json文件位置
        type: "GET", //请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) { //请求成功完成后要执行的方法 
            var appendHtml = "";
            var jobList = data.jobList;
            for (var i = 0; i < jobList.length; i++) {
                appendHtml = appendHtml + '<div class="content_recruit"><div class="recruit_title"><h3>' + jobList[i].title + '</h3></div><div class="recruit_Con"><div class="recruit_Con_left"><div class="recruit_Con_box"><h4>岗位职责:</h4>' + getiItemListToHtml(jobList[i].responsibilities) + '</div><div class="con_top recruit_Con_box"><h4>基本要求:</h4>' + getiItemListToHtml(jobList[i].requirement) + '</div><div class="con_top recruit_Con_box"><h4>加分项:</h4>' + getiItemListToHtml(jobList[i].extra) + '</div><div class="con_top recruit_Con_box"><h4>工作地点:</h4><p>' + jobList[i].workplace + '</p></div></div><div class="recruit_Con_img"><img src="' + jobList[i].imgUrl + '"></div></div></div>'
            }
            $('.content_body').append(appendHtml);
            function getiItemListToHtml(itemlist) {//数组转换成<p>标签包裹的html片段
                var htmlDom = "";
                for (var i = 0; i < itemlist.length; i++) {
                    htmlDom += "<p>" + itemlist[i] + "</p>";
                }
                return htmlDom;
            }
        }
    })
}

function clickToEnlargeImg(obj) {//放大图片，obj为事件出发Dom节点对象
    var imgsrc = obj.src;
    var opacityMask = '<div id="opacityMask" style="display: none"><img class="enlargeImg" src="' + imgsrc + '" ></div>';
    $(document.body).append(opacityMask);//底层蒙版
    toEnlargeImg();//使图片变大
}

function toEnlargeImg() {
    var scrollTop = $(window).scrollTop() + 20;
    $("#opacityMask").addClass("opacityMask");
    $("#opacityMask").show();
    $("html,body").addClass("none-scroll");//下层不可滑动
    $(".enlargeImg").addClass("enlargeImg");
    $(".enlargeImg").bind("click", clickToSmallImg);
    function clickToSmallImg() {
        $("html,body").removeClass("none-scroll");
        $(window).scrollTop(scrollTop);//缩小后恢复到原位
        $("#opacityMask").remove();
    }
};