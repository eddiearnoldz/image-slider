const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slides');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const interval = 3000


let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId;
slide.style.width = '100%'; //images per slide 50%=2, 33.3%=3, 25%=4

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone'
lastClone.id = 'last-clone'

slide.append(firstClone)
slide.prepend(lastClone)

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth*index}px)`

//auotplay slides
const startSlide = () => {
  slideId = setInterval(()=> {
   moveToNextSlide();
  }, interval)
}

const getSlides = () => {
  return slides = document.querySelectorAll('.slide');
}


//infinite loop slides

slide.addEventListener('transitionend', () => {
  slides = getSlides()
  if(slides[index].id === firstClone.id){
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = `translateX(${-slideWidth*index}px)`;
  }
  if(slides[index].id === lastClone.id){
    slide.style.transition = 'none';
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth*index}px)`;
  }
})

const moveToNextSlide = () => {
  slides = getSlides()
  if(index >= slides.length -1) return
  index++;
  slide.style.transform = `translateX(${-slideWidth*index}px)`;
  slide.style.transition = '.7s';
};

const moveToPreviousSlide = () => {
  slides = getSlides()
  if(index <= 0) return
  index--;
  slide.style.transform = `translateX(${-slideWidth*index}px)`;
  slide.style.transition = '.7s';
}

//stop autoplay when mouse enters
slideContainer.addEventListener('mouseenter', () => {
  clearInterval(slideId)
});

//restart autoplay when mouse leaves
slideContainer.addEventListener('mouseleave', startSlide);

nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);

//touch slide for mobile
let touchstartX = 0
let touchendX = 0
    
const checkDirection = () => {
  if (touchendX < touchstartX) moveToNextSlide();
  if (touchendX > touchstartX) moveToPreviousSlide();
}

slideContainer.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].clientX
})

slideContainer.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].clientX
  checkDirection()
})

startSlide();