console.log('main.js loaded');
let numberUnfollowEffect = document.getElementById('numberUnfollowEffect');
let numberFollowEffect = document.getElementById('numberFollowEffect')
let img_duck_dom =document.getElementById('img_duck');
let page_cover_div = document.getElementById('cover-div');
let startX = 0;
let moveX = 0;

let unfollow = 0;
let follow = 0;

let text_unfollow_duck =document.getElementById('unfollow');
let text_follow_duck =document.getElementById('follow');

let is_mouse_pressed = false; 

function swipe_action(direction) {
    img_duck_dom.classList.remove('animate-top');
    img_duck_dom.style.transition = 'transform 0.5s';
    img_duck_dom.style.transform = `translate(${direction * window.innerWidth}px, 0px) rotate(${90 * direction}deg)`;
    if (direction < 0 ){
        unfollow++;
        text_unfollow_duck.innerText = unfollow;

        numberUnfollowEffect.classList.add("minus-one")
        numberUnfollowEffect.innerText = "+1"
        numberUnfollowEffect.classList.remove("hidden")
        
        setTimeout(() => {
            numberUnfollowEffect.classList.remove("minus-one")
            numberUnfollowEffect.classList.add("hidden")
          }, 500)
    }  else {
        follow++;
        text_follow_duck.innerText = follow;

        numberFollowEffect.classList.add("plus-one")
        numberFollowEffect.innerText = "+1"
        numberFollowEffect.classList.remove("hidden")
        
        setTimeout(() => {
            numberFollowEffect.classList.remove("plus-one")
            numberFollowEffect.classList.add("hidden")
          }, 500)
    }
}


function loadNew_picture() {

    let uniqueTime = new Date().getTime();
    img_duck_dom.setAttribute('src', 'https://random-d.uk/api/randomimg?_=' + uniqueTime);
    img_duck_dom.onload = function() {
        img_duck_dom.style.transition = '';
        img_duck_dom.style.transform = '';
        img_duck_dom.classList.add('animate-top');
    };
}

page_cover_div.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
    }
);

page_cover_div.addEventListener('touchmove', function(event) {
        moveX = event.touches[0].clientX;
    }
);

page_cover_div.addEventListener('touchend', swipeHandler);

// img_duck_dom.addEventListener('touchend', function(event) {
//         console.log(moveX - startX > 0 ? "swiped right" : "swiped left");
//         swipe_action(moveX - startX > 0 ? 1 : -1);
//         setTimeout(loadNew_picture, 500);
//     }
// );
//End

page_cover_div.addEventListener('mousedown', function(event) {
    is_mouse_pressed = true;
    startX = event.clientX;
});

page_cover_div.addEventListener('mousemove', function(event) {
    if(is_mouse_pressed){
        //console.log("pressed :",event.clientX);
        moveX = event.clientX;
    }
});

page_cover_div.addEventListener('mouseup', function (event) {
    is_mouse_pressed=false;
    //console.log("mouseUp :",event.clientX);
    swipeHandler();
});

function swipeHandler() {
    console.log(moveX - startX > 0 ? "swiped right" : "swiped left");
    swipe_action(moveX - startX > 0 ? 1 : -1);
    setTimeout(loadNew_picture, 500);
}