    //      Created by Alexander Knishevich
    //      My contacts:
    //              VK: https://vk.com/aknishevich
    //              E-mail: aknishevich@gmail.com
    //              Upwork-Profile: https://www.upwork.com/freelancers/~016171e34f311aeb56
    window.onload = function(){
        $(".zoom_bg").hide();
        $(".zoom_bg").css("visibility", "visible");
        load();
        if (zoom == true){
            likesrefresh();
            commentsRefresh();
            $('.zoom_bg').show();
        }
    }
    if (localStorage.images && localStorage.likes && localStorage.dislikes && localStorage.yourLikes && localStorage.yourDislikes && localStorage.comments && localStorage.key1 && localStorage.key2&& localStorage.zoom && localStorage.id){
        var images = localStorage.images ? JSON.parse(localStorage.images) : [];
        var likes = localStorage.likes ? JSON.parse(localStorage.likes) : [];
        var dislikes = localStorage.dislikes ? JSON.parse(localStorage.dislikes) : [];
        var yourLikes = localStorage.yourLikes ? JSON.parse(localStorage.yourLikes) : [];
        var yourDislikes = localStorage.yourDislikes ? JSON.parse(localStorage.yourDislikes) : [];
        var comments =  localStorage.comments ? JSON.parse(localStorage.comments) : [];
        var key1 = localStorage.key1 ? JSON.parse(localStorage.key1) : [];
        var key2 = localStorage.key2 ? JSON.parse(localStorage.key2) : [];
        var zoom = localStorage.zoom ? JSON.parse(localStorage.zoom) : [];
        var id = parseInt(localStorage.id ? JSON.parse(localStorage.id) : [], 10);
    }
    else {
        var images = ['images/img1.jpg', 'images/img2.jpg', 'images/img3.jpg', 'images/img4.jpg', 'images/img5.jpg', 'images/img6.jpg', 'images/img7.jpg', 'images/img8.jpg'];
        var likes = genLikes();
        var dislikes = genLikes();
        var yourLikes = genYourLikes();
        var yourDislikes = genYourDisLikes();
        var key1 = genKey();
        var key2 = genKey();
        var comments = genComments();
        var zoom = false;
        var id = 0;
        datasave();
    }
    function genKey(){
        var key = "";
        var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        for( var i=0; i < 10; i++ )
            key += possible.charAt(Math.floor(Math.random() * possible.length));
        return key;
    }
    function sendComment() {
        if (document.getElementById("author").value != ''){
            if (document.getElementById("comment").value != ''){
                if (comments[id] == "zero"){
                    comments[id] = document.getElementById("author").value + key1 + dateToString() + key1 + document.getElementById("comment").value;
                }
                else{
                    comments[id] = document.getElementById("author").value + key1 + dateToString() + key1 + document.getElementById("comment").value + key2 + comments[id];
                }
                datasave();
                document.getElementById("author").value = "";
                document.getElementById("comment").value = "";
                commentsRefresh();
            }
            else alert("Enter your comment!");
        }
        else alert("Enter your nickname!");
    }
    function genLikes() {
        var arr = new Array();
        for (var i = 0; i < images.length; i++){
            arr[i] = Math.floor(Math.random() * 20);
        }
        return arr;
    }
    function genYourLikes() {
        var arr = new Array();
        for (var i = 0; i < images.length; i++){
            if (likes[i] > 0){
                if (Math.floor(Math.random() * 2) == 0) arr[i] = false;
                else arr[i] = true;
            }
            else arr[i] = false;
        }
        return arr;
    }
    function genYourDisLikes() {
        var arr = new Array();
        for (var i = 0; i < images.length; i++){
            if (yourLikes[i] == true){
                arr[i] = false;
            }
            else{
                if (dislikes[i] > 0){
                    if (Math.floor(Math.random() * 2) == 0) arr[i] = false;
                    else arr[i] = true;
                }
                else arr[i] = false;
            }
        }
        return arr;
    }
    function dateFromString(str){
        strSplit = str.split(" ");
        var year = parseInt(strSplit[0], 10);
        var month = parseInt(strSplit[1], 10);
        var day = parseInt(strSplit[2], 10);
        var hour = parseInt(strSplit[3], 10);
        var minutes = parseInt(strSplit[4], 10);
        var seconds = parseInt(strSplit[5], 10);
        var date = new Date(year, month, day, hour, minutes, seconds);
        return date;
    }
    function dateToString() {
        var date = new Date();
        var str = date.getFullYear() + " " + date.getMonth() + " " + date.getDate() + " " + date.getHours() + " " + date.getMinutes() + " " + date.getSeconds();
        return str;
    }
    function genComments() {
        var aut = "Anon93&Andrey&Sergey&Misha&Irina".split("&");
        var dates = ['2015 6 12 19 06 0', '2016 1 16 17 0 0', '2017 2 6 14 0 5', '2017 3 3 17 0 0', '2017 3 8 4 6 0'];
        var com1 = "Nullam viverra leo eget urna maximus,  et pellentesque enim vol&Quisque convallis nec est nec maximus. Sed lacus est, congue Quisque convallis nec est nec maximus. Sed lacus est, congue Quisque convallis nec est nec maximus. Sed lacus est, congue&" +
            "Quisque convallis nec est nec maximus. Sed lacus est, congue Quisque convallis nec est nec maximus. Sed lacus est, congue Quisque convallis nec est nec maximus. Sed lacus est, congue&" +
            "Donec ut justo nulla. Duis posuere in  leo in congue.&Quisque convallis nec est nec maximus. Sed lacus est, congue Quisque convallis nec est nec maximus. Sed lacus est, congue Quisque convallis nec est nec maximus. Sed lacus est, congue";
        var com = com1.split("&");
        var comarr = new Array();
        for (var i = 0; i < images.length; i++){
            var gencom = "";
            var k = Math.floor(Math.random() * 5);
            for (var j = 0; j <= k; j++){
                if (j != k){
                    gencom += aut[Math.floor(Math.random() * 5)] + key1 + dates[4-j] + key1 + com[Math.floor(Math.random() * 5)] + key2;
                }
                else {
                    gencom += aut[Math.floor(Math.random() * 5)] + key1 + dates[4-j] + key1 + com[Math.floor(Math.random() * 5)];
                }
            }
            if (gencom != ""){
                comarr[i] = gencom;
            }
        }
        return comarr;
    }
    function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);
        var info = "";
        if (seconds < 0){
            return "We don't serve people from the future =)";
        }
        if (interval > 1) {
            info += interval + " years ago";
            return info;
        }
        if (interval == 1){
            info += interval + " year ago";
            return info;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            info += interval + " months ago";
            return info;
        }
        if (interval == 1){
            info += interval + " month ago";
            return info;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            info += interval + " days ago";
            return info;
        }
        if (interval == 1){
            info += interval + " day ago";
            return info;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            info += interval + " hours ago";
            return info;
        }
        if (interval == 1){
            info += interval + " hour ago";
            return info;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            info += interval + " minutes ago";
            return info;
        }
        if (interval == 1){
            info += interval + " minute ago";
            return info;
        }
        interval = seconds;
        if (interval > 1){
            info += Math.floor(seconds) + " seconds ago";
            return info;
        }
        if (interval <= 1){
            return "Recently";
        }
    }
    function datasave() {
        localStorage.images = JSON.stringify(images);
        localStorage.likes = JSON.stringify(likes);
        localStorage.dislikes = JSON.stringify(dislikes);
        localStorage.yourLikes = JSON.stringify(yourLikes);
        localStorage.yourDislikes = JSON.stringify(yourDislikes);
        localStorage.comments = JSON.stringify(comments);
        localStorage.key1 = JSON.stringify(key1);
        localStorage.key2 = JSON.stringify(key2);
        if ($('.zoom_bg').css('display') !== 'none'){
            localStorage.zoom = true;
            localStorage.id = JSON.stringify(id);
        }
        else{
            localStorage.zoom = false;
            localStorage.id = 0;
        }
    }
    function validateSize(fileInput,size) {
        var fileObj, oSize;
        if ( typeof ActiveXObject == "function" ) { // IE
            fileObj = (new ActiveXObject("Scripting.FileSystemObject")).getFile(fileInput.value);
        }else {
            fileObj = fileInput.files[0];
        }
        oSize = fileObj.size; // Size returned in bytes.
        if(oSize > size * 1024 * 1024){
            return false
        }
        return true;
    }
    function load (){
        for(var i = 0; i < images.length; i++){
            $(".container2").append('<div id = "'+i+'" onmousemove="move(this)" onmouseleave="leave(this)" onclick="clicked(this)"></div>');
            $("#"+i).append('<div class="photo_info"><div class="icon com"></div><div class="icon like"></div><div class="icon dis"></div></div>');
            var img = new Image();
            img.src = images[i];
            var x = img.height / img.width;
            $("#"+i).css("height", "200px");
            $("#"+i).css("width", "236px");
            img.width = 236;
            img.height = 200;
            $("#"+i).append(img);
            $("#"+i+" .photo_info .like").append('<p>' + likes[i] + '</p>');
            $("#"+i+" .photo_info .dis").append('<p>' + dislikes[i] + '</p>');
            if (comments[i] == "zero") $("#"+i+" .photo_info .com").append('<p>' + 0 + '</p>');
            else{
                var comms = comments[i].split(key2);
                $("#"+i+" .photo_info .com").append('<p>' + comms.length + '</p>');
            }
            if(comments[i].split(key2).length > 9){
                $("#"+i+" .photo_info .com p").css("right", "3px");
                $("#"+i+" .photo_info .com p").css("bottom", "4px");
            }
            if(likes[i] > 9){
                $("#"+i+" .photo_info .like p").css("right", "2px");
                $("#"+i+" .photo_info .like p").css("bottom", "4px");
            }
            if (dislikes[i] > 9){
                $("#"+i+" .photo_info .dis p").css("right", "2px");
                $("#"+i+" .photo_info .dis p").css("bottom", "4px");
            }
        }
        $(".container2").append('<div id = "add"></div>');
        $("#add").append('<input type="file" id="imgfile" class="hide" name="picture" accept="image/*" onchange="addclick(this)"><div class = "add_image"></div></input>');
        $(".add_image").append('<label for = "imgfile"><img src = "images/add.png"><p>Add your</p><p>Picture</p></label>');
        $('.photo_info').hide();
        datasave();
    }
    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            images[images.length] = reader.result;
            likes[likes.length] = 0;
            comments[comments.length] = "zero";
            dislikes[dislikes.length] = 0;
            yourLikes[yourLikes.length] = false;
            yourDislikes[yourDislikes.length] = false;
            $(".container2 div").remove();
            load();
            datasave();
        };
    }
    function addclick(obj) {
            if(validateSize(obj, 2) == false) {
                alert("File size Exceeded! (Max - 2 Mb) Please, load another file or optimize your image for Web");
            }
            else {
                var ext = obj.value.split('.').pop().toLowerCase();
                if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
                    alert('Invalid extension! Please, load file with extension .gif, .png, .jpg or .jpeg');
                }
                else{
                    getBase64(obj.files[0]);
                }
            }
    }
    function move(obj) {
        $(obj).children('.photo_info').show();
    }
    function leave(obj) {
        $(obj).children('.photo_info').hide();
    }
    function commentsRefresh() {
        $("#comments div").remove();
        $("#comments p").remove();
        if (comments[id] != "zero"){
            $(".boxcomments .count").text("Comments: " + comments[id].split(key2).length);
            for (var i = 0; i < comments[id].split(key2).length; i++) {
                var coments = comments[id].split(key2);
                var comInfo = coments[i].split(key1);
                $("#comments").append('<div class="comm"><div class="author"><p>' + 'By ' + comInfo[0] + '</p></div><div class="date"> <p>' + timeSince(dateFromString(comInfo[1])) + '</p></div><p>' + comInfo[2] + '</p></div>');
                $('.photo_info').hide();
                $(".photo img").attr("src", images[id]);
                $(".zoom_bg").show();
                datasave();
            }
        }
        else $(".boxcomments .count").text("Comments: 0");
    }
    function likesrefresh() {
        if (yourLikes[id] == true){
            $(".likez").css("background-image", "url('images/like_active.png')");
            $(".likes.likez").css("bottom", "0px");
            $(".dislikez").css("background-image", "url('images/dislike_normal.png')");
            $(".likes.dislikez").css("bottom", "7px");
        }
        else if (yourDislikes[id] == true){
            $(".dislikez").css("background-image", "url('images/dislike_active.png')");
            $(".likes.dislikez").css("bottom", "0px");
            $(".likez").css("background-image", "url('images/like_normal.png')");
            $(".likes.likez").css("bottom", "7px");
        }
        else{
            $(".likez").css("background-image", "url('images/like_normal.png')");
            $(".likes.likez").css("bottom", "7px");
            $(".dislikez").css("background-image", "url('images/dislike_normal.png')");
            $(".likes.dislikez").css("bottom", "7px");
        }
        $(".photo .likez p").text(likes[id]);
        $(".photo .dislikez p").text(dislikes[id]);
        if (likes[id] > 9){
            $(".photo .likez p").css("left", "41px");
        }
        else{
            $(".photo .likez p").css("left", "44px");
        }
        if (dislikes[id] > 9){
            $(".photo .dislikez p").css("left", "37px");
        }
        else{
            $(".photo .dislikez p").css("left", "40px");
        }
        datasave();
    }
    function likeclick() {
        if(yourLikes[id] == false){
            if (yourDislikes[id] == true){
                $(".likez").css("background-image", "url('images/like_active.png')");
                $(".likes.likez").css("bottom", "0px");
                $(".dislikez").css("background-image", "url('images/dislike_normal.png')");
                $(".likes.dislikez").css("bottom", "7px");
                yourLikes[id] = true;
                yourDislikes[id] = false;
                likes[id] ++;
                dislikes[id] --;
            }
            else {
                $(".likez").css("background-image", "url('images/like_active.png')");
                $(".likes.likez").css("bottom", "0px");
                yourLikes[id] = true;
                likes[id] ++;
            }
        }
        likesrefresh();
    }
    function dislikeclick() {
        if (yourDislikes[id] == false){
            if (yourLikes[id] == true){
                $(".dislikez").css("background-image", "url('images/dislike_active.png')");
                $(".likes.dislikez").css("bottom", "0px");
                $(".likez").css("background-image", "url('images/like_normal.png')");
                $(".likes.likez").css("bottom", "7px");
                yourLikes[id] = false;
                yourDislikes[id] = true;
                likes[id] --;
                dislikes[id] ++;
            }
            else {
                $(".dislikez").css("background-image", "url('images/dislike_active.png')");
                $(".likes.dislikez").css("bottom", "0px");
                yourDislikes[id] = true;
                dislikes[id] ++;
            }
        }
        likesrefresh();
    }
    function clicked(obj) {
        for (var i = 0; i < images.length; i++){
            if (obj.id == i) {
                id = i;
                $('.photo_info').hide();
                $(".photo img").attr("src", images[id]);
                $(".zoom_bg").show();
                likesrefresh();
                commentsRefresh();
                datasave();
            }
        }
    }
    $(".close").click(function () {
        $(".container2 div").remove();
        load();
        $(".zoom_bg").hide();
        zoom = false;
        datasave();
    })