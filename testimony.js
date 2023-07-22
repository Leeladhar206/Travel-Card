document.addEventListener("DOMContentLoaded", function () {
    const carouselTrack = document.querySelector(".carousel-track");
    const carouselSlides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.querySelector(".carousel-prev");
    const nextBtn = document.querySelector(".carousel-next");
    const slideWidth = carouselSlides[0].offsetWidth;
    let slideIndex = 0;

    // Move carousel to the selected slide index
    function moveToSlide(index) {
        carouselTrack.style.transform = `translateX(-${index * slideWidth}px)`;
        slideIndex = index;
    }

    // Previous button click event
    prevBtn.addEventListener("click", function () {
        slideIndex = (slideIndex - 1 + carouselSlides.length) % carouselSlides.length;
        moveToSlide(slideIndex);
    });

    // Next button click event
    nextBtn.addEventListener("click", function () {
        slideIndex = (slideIndex + 1) % carouselSlides.length;
        moveToSlide(slideIndex);
    });
});
