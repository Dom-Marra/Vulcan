//------------------------------------------------//
//                  Image Slider                  //
//------------------------------------------------//

let switchImageTimeout;         //Current timeout to next image
let currentSlideIndex;          //Current image index
let currentSliderAnimation;     //The current slider animation running

let sliderPaginations = $('.slider-pagination').children();

/**
 * Click events for the slide pagination
 */
sliderPaginations.each(function(index) {
    $(this).click(() => {
        setNewActiveImage(index);
    });
});

/**
 * Changes the image to display in the slider
 * 
 * @param {number} index 
 *       The index of the image element in the parent container
 */
let setNewActiveImage = (index) => {

    //The image element to make active
    let nextActive = $('.slide-show-wrapper').find('img').eq(index);

    //The current active image element
    let currentActive = $('.slide-show-wrapper').find('img').eq(currentSlideIndex);
    
    //Duration for image fade
    let animationTime = 0;

    //Do not switch if the current index is the same as the current image
    if (index != currentSlideIndex) {
        currentSliderAnimation?.finish();       //Make the current animation finish
        currentSlideIndex = index;              //Set the current image index to the one passed

        let nextActiveZ = 1;                    //The z-index to set the active image initially

        //If there is a current active image set an animation time
        //If not set the z-index to use to be 2
        if (currentActive.length) animationTime = 600;  
        else nextActiveZ = 2;
        
        //Remove the active class from the pagination spans
        //Add the class to the correct span
        sliderPaginations.removeClass('active');
        $(sliderPaginations[index]).addClass('active');

        //Set the z-index of the image to be active and its opactiy
        nextActive.css({'z-index': nextActiveZ, opacity: 1});

        //Animate the current active image opacity to fade to 0
        //After the animation is complete set its z-index to -1
        //and set the one that will be active to 2
        currentSliderAnimation = currentActive.animate({
            opacity: 0
        }, animationTime, () => {
                currentActive.css({'z-index': -1});
                nextActive.css({'z-index': 2});
        });
    }

    //Clear the timeout for the image switch
    window.clearTimeout(switchImageTimeout)

    //Set a new timeout for the next image switch (5 seconds)
    switchImageTimeout = setTimeout(() => {
        setNewActiveImage(index + 1 > 2 ? 0 : index + 1);
    }, 5000 + animationTime)
}

//Init the active image to the first image
setNewActiveImage(0);


//------------------------------------------------//
//                   Header                       //
//------------------------------------------------//

const TOP_NAV = $('#top-nav');
const TOP_NAV_TOGGLE = $('#menu-toggle');
const MEDIA_QUERY = window.matchMedia('(min-width: 48em)');
const HEADER = $('#header');

let toggleNav = (close = false) => {
    if (TOP_NAV.hasClass('opened') || close) {
        TOP_NAV.removeClass('opened');

        TOP_NAV_TOGGLE.removeClass('toggled');
    } else {
        TOP_NAV.addClass('opened');

        TOP_NAV_TOGGLE.addClass('toggled');
    }
}

TOP_NAV_TOGGLE.click(() => {
    toggleNav();
});


if (!MEDIA_QUERY.matches) {
    TOP_NAV.addClass('animate');
}

MEDIA_QUERY.addEventListener('change', (e) => {
    if (e.matches) {
        TOP_NAV.removeClass('animate');
        TOP_NAV.removeClass('opened');
        TOP_NAV_TOGGLE.removeClass('toggled');

    } else TOP_NAV.addClass('animate');
});

window.addEventListener('popstate', () => {
    if (TOP_NAV.hasClass('opened')) toggleNav(true);
})