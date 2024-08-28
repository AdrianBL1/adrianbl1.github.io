// envolver cada letra en un span
var textWrapper = document.querySelector(".titulo")
textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letra'>$&</span>"
)

anime.timeline().add({
    targets: '.titulo .letra',
    translateY: [200, 0],
    easing: "easeOutExpo",
    opacity: 1,
    duration: 1700,
    delay: (el, i) => 400 + 70 * i
})

TweenMax.from(".footer", 1.5, {
    delay: 0.7,
    opacity: 0,
    y: 200,
    ease: Expo.easeInOut
})

TweenMax.from(".menu ul li", 1.5, {
    delay: 1,
    opacity: 0,
    y: -30,
    ease: Expo.easeInOut
}, 0.08)

TweenMax.from(".subtitulo", 1.5, {
    delay: 1.5,
    opacity: 0,
    y: -50,
    ease: Expo.easeInOut
})

TweenMax.from(".figura", 1.5, {
    delay: 1.5,
    opacity: 0,
    ease: Expo.easeInOut
})