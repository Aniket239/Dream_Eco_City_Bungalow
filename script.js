/* ===================================== banner lazy load ============================================*/
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('bannerVideo');
    const bannerImage = document.querySelector('.banner_image');
    const muteToggle = document.getElementById('muteToggle');
    const muteButtonIcon = document.getElementById('mute_button');

    const loadVideoSources = () => {
        const sources = video.querySelectorAll('source[data-src]');
        sources.forEach(source => {
            source.src = source.getAttribute('data-src');
        });
        video.load();
    };

    const handleVideoPlay = () => {
        // Fade out the image and fade in the video
        bannerImage.style.opacity = '0';
        video.classList.add('playing');
        if (bannerImage.style.opacity == '0') {
            setTimeout(function () {
                // Select the welcome section
                var welcomeSection = document.getElementById('welcome');
                console.log('====================================');
                console.log(window.scrollY);
                console.log('====================================');
                if (welcomeSection && window.scrollY < 150) {
                    // Calculate the position to scroll to, subtracting the offset (70px)
                    var offset = 85; // Offset in pixels
                    var elementPosition = welcomeSection.getBoundingClientRect().top + window.pageYOffset;
                    var offsetPosition = elementPosition - offset;

                    // Scroll to the calculated position smoothly
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.warn('Element with id "welcome" not found.');
                }
            }, 31000); // 30000 milliseconds = 30 seconds
        }
    };

    const handleVideoCanPlay = () => {
        video.play().then(() => {
            handleVideoPlay();
        }).catch(error => {
            console.error("Error attempting to play the video:", error);
            // Optionally, keep showing the image if video fails to play
        });
    };

    const setupIntersectionObserver = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.25
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadVideoSources();
                    video.addEventListener('canplaythrough', handleVideoCanPlay, { once: true });
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(video);
    };

    const toggleMute = () => {
        video.muted = !video.muted;
        muteButtonIcon.textContent = video.muted ? 'volume_off' : 'volume_up';
    };

    muteToggle.addEventListener('click', toggleMute);

    // Initialize
    setupIntersectionObserver();
});

/*========================================================================================================================== */


/*===================================== scroll after video ends ================================================== */
// document.addEventListener('DOMContentLoaded', function () {
//     // Set a timeout for 30 seconds (30000 milliseconds)
//         setTimeout(function () {
//             // Select the welcome section
//             var welcomeSection = document.getElementById('welcome');
//             console.log('====================================');
//             console.log(window.scrollY);
//             console.log('====================================');
//             if (welcomeSection && window.scrollY < 150) {
//                 // Calculate the position to scroll to, subtracting the offset (70px)
//                 var offset = 85; // Offset in pixels
//                 var elementPosition = welcomeSection.getBoundingClientRect().top + window.pageYOffset;
//                 var offsetPosition = elementPosition - offset;

//                 // Scroll to the calculated position smoothly
//                 window.scrollTo({
//                     top: offsetPosition,
//                     behavior: 'smooth'
//                 });
//             } else {
//                 console.warn('Element with id "welcome" not found.');
//             }
//         }, 32000); // 30000 milliseconds = 30 seconds
// });

/*========================================================================================================================== */
// ===================================== Add shadow in nav ================================
const nav = document.querySelector('nav');
const nav_items = document.querySelectorAll('.nav-items li a');
function addShadowOnScroll() {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
        nav.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
        nav.style.backdropFilter = 'blur(15px)';
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        nav.classList.add('scrolled');
        nav_items.forEach(items => {
            items.style.color = '#986048'
        })
    } else {
        nav.style.boxShadow = "none";
        nav.style.backdropFilter = 'none';
        nav.style.backgroundColor = 'transparent';
        nav.classList.remove('scrolled');
        nav_items.forEach(items => {
            items.style.color = 'white'
        })
    }
}
window.addEventListener('scroll', addShadowOnScroll);
// ================================================== scroll to section =========================================================


document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const offset = 140;
            window.scrollTo({
                top: targetSection.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });
});
function openMenu() {
    var checkbox = document.getElementById('hamburger-checkbox');
    const mobileNav = document.querySelector('.mobile-nav');
    if (checkbox.checked) {
        mobileNav.style.display = 'flex';
        mobileNav.style.animationName = 'fadeIn';
    } else {
        mobileNav.style.animationName = 'fadeOut';
        setTimeout(() => {
            mobileNav.style.display = 'none';
        }, 500);  // Delay hiding the menu to allow the animation to complete
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('#nav-links a');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    const mobileNav = document.querySelector('.mobile-nav');
    var checkbox = document.getElementById('hamburger-checkbox');

    // Function to set the active section
    function setActiveSection(sectionId) {
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === sectionId) {
                link.classList.add('active');
            }
        });
    }

    // Function to handle scroll event
    function handleScroll() {
        let fromTop = window.scrollY + 80;
        let activeSet = false;
        mobileNavLinks.forEach(link => {
            let section = document.getElementById(link.getAttribute('href').substring(1));
            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add('active');
                activeSet = true;
            } else {
                link.classList.remove('active');
            }
        });
        return activeSet;
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            mobileNav.style.display = 'none';
            checkbox.checked = false;
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const offset = 70;
            window.scrollTo({
                top: targetSection.offsetTop - offset,
                behavior: 'smooth'
            });
            setActiveSection(targetId);
        });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            mobileNav.style.display = 'none';
            checkbox.checked = false;
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const offset = 70;
            window.scrollTo({
                top: targetSection.offsetTop - offset,
                behavior: 'smooth'
            });
            setActiveSection(targetId);
        });
    });

    // Check initial scroll position on load
    window.addEventListener('load', function () {
        const activeSet = handleScroll();
        if (!activeSet) {
            mobileNavLinks[0].classList.add('active');
        }
    });

    // Handle scroll event
    window.addEventListener('scroll', handleScroll);
});
// ================================================== nav items animation =========================================================

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('#nav-links li');

    navLinks.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('animate');
        }, 200 * index);
    });
});



// ================================================ side nav ================================================

var sideNavCall = document.querySelector('.side-nav-call');
var phoneNumber = document.getElementById('side-nav-phone-number');

sideNavCall.addEventListener('mouseover', function () {
    phoneNumber.classList.add('revealed');
});

sideNavCall.addEventListener('mouseout', function () {
    phoneNumber.classList.remove('revealed');
});

document.addEventListener('DOMContentLoaded', function () {
    const sideNavbar = document.querySelector('.side-nav');

    window.addEventListener('scroll', function () {
        var scrollAmount = window.scrollY;
        if (scrollAmount > 300) {
            sideNavbar.classList.add('show');
            sideNavbar.classList.remove('side-nav-hide');
        } else {
            sideNavbar.classList.remove('show');
            sideNavbar.classList.add('side-nav-hide');
        }
    });
});


//============================================== bottom-nav================================

// document.addEventListener('DOMContentLoaded', function () {
//     const bottom = document.querySelector('.bottom-nav');

//     window.addEventListener('scroll', function () {
//         var scrollAmount = window.scrollY;
//         if (scrollAmount > 300) {
//             bottom.classList.add('show');
//             bottom.classList.remove('bottom-nav-hide');
//         } else {
//             bottom.classList.remove('show');
//             bottom.classList.add('bottom-nav-hide');
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var mobile = getParameterByName('cellno');
    console.log(`cell no: ${mobile}`); // Debugging log

    var callLink = document.getElementById('click_to_call');
    var phoneNumberElement = document.getElementById('phone_number');
    var sideNavPhoneNumber = document.getElementById('side-nav-phone-number');

    console.log(`callLink: ${callLink}`);
    console.log(`phoneNumberElement: ${phoneNumberElement}`);
    console.log(`sideNavPhoneNumber: ${sideNavPhoneNumber}`);

    if (mobile) {
        var phoneNumber = mobile.startsWith('+91') ? mobile : '+91' + mobile;
        callLink.href = "tel:" + phoneNumber;
        var formattedNumber = phoneNumber.slice(0, 3) + " " + phoneNumber.slice(3, 7) + " " + phoneNumber.slice(7, 10) + " " + phoneNumber.slice(10);
        console.log(`Formatted Number: ${formattedNumber}`); // Debugging log
        phoneNumberElement.textContent = formattedNumber;
        sideNavPhoneNumber.textContent = formattedNumber;
    }
});

// ============================================== form ============================================
function enquiryForm(value) {
    var utmFormNameInput = document.getElementById('utm_form_name');
    if (utmFormNameInput) {
        utmFormNameInput.value = value;
    }
    const formContainer = document.getElementById('form-container');
    const body = document.getElementsByTagName('body')[0];
    const form = document.querySelector('.enquiry-form');

    // Remove any existing hidden input for enquiry_type
    const existingHiddenInput = document.getElementById('enquiryType');
    if (existingHiddenInput) {
        existingHiddenInput.remove();
    }

    console.log(`Form origin: ${value}`);

    // Create and add the hidden input for enquiry_type
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'enquiry_type';
    hiddenInput.id = 'enquiryType';
    hiddenInput.value = value;
    form.appendChild(hiddenInput);

    formContainer.style.display = 'grid';
    formContainer.classList.add('fade-in');
    formContainer.classList.remove('fade-out');
    body.style.overflow = 'hidden';
    formContainer.dataset.closed = 'false';
}

const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', closeForm);

function closeForm() {
    console.log('====================================');
    console.log("close button clicked");
    console.log('====================================');
    const formContainer = document.getElementById('form-container');
    const body = document.getElementsByTagName('body')[0];
    formContainer.classList.remove('fade-in');
    formContainer.classList.add('fade-out');

    formContainer.addEventListener('animationend', function handleAnimationEnd() {
        formContainer.style.display = 'none';
        formContainer.classList.remove('fade-out');
        formContainer.removeEventListener('animationend', handleAnimationEnd);
    });

    body.style.overflow = 'auto';
    formContainer.dataset.closed = 'true';
}

document.getElementById('nameInput').setCustomValidity('Please enter your full name');
document.getElementById('phoneInput').setCustomValidity('Please enter a valid 10-digit mobile number');
document.getElementById('emailInput').setCustomValidity('');

function clearValidityMessage(element) {
    element.setCustomValidity('');
    const value = element.value.toString();
    if (value !== '' && value !== '-' && value !== '+' && value !== 'e' && value !== '-e' && value !== '+e') {
        element.classList.add('has-value');
    } else {
        element.classList.remove('has-value');
    }
}

document.getElementById('phoneInput').addEventListener('input', function () {
    let phoneValue = this.value;
    let regex = /^\d{10}$/;
    if (!regex.test(phoneValue)) {
        this.setCustomValidity('Please enter a valid 10-digit mobile number');
    } else {
        this.setCustomValidity('');
    }
});

window.addEventListener('scroll', function () {
    var scrollAmount = window.scrollY;
    const formContainer = document.getElementById('form-container');
    const body = document.getElementsByTagName('body')[0];
    if (scrollAmount > 1500 && formContainer.dataset.closed !== 'true') {
        enquiryForm('registration');
        formContainer.style.display = 'grid';
        formContainer.classList.add('fade-in');
        body.style.overflow = 'hidden';
    } else if (formContainer.dataset.closed !== 'true') {
        formContainer.style.display = 'none';
        formContainer.classList.remove('fade-in');
        body.style.overflow = 'auto';
    }
});


//========================================== enquiry form after few section ================================

// document.addEventListener('DOMContentLoaded', function () {
//     const sections = document.querySelectorAll('section'); // Select all sections within the main content
//     let sectionCounter = 0;

//     window.addEventListener('scroll', function () {
//         sections.forEach((section, index) => {
//             if (section.getBoundingClientRect().top < window.innerHeight && !section.classList.contains('viewed')) {
//                 section.classList.add('viewed');
//                 sectionCounter++;
//                 console.log(`section count: ${sectionCounter}`)

//                 if (sectionCounter>4 && sectionCounter % 4 === 0) { // Check if two sections have been viewed
//                     enquiryForm('registration');
//                 }
//             }
//         });
//     });
// });

// ================================================ form submission =============================================

// function formSubmit(e) {
//     e.preventDefault();
//     const name = document.getElementById('nameInput').value;
//     const phone = document.getElementById('phoneInput').value;
//     const email = document.getElementById('emailInput').value;
//     const enquiryType = document.getElementById('enquiryType').value;
//     // const utm_form_name  = document.getElementById('utm_form_name').value;
//     // console.log(`utm_form_name value: ${utm_form_name}`);
//     console.log("name: " + name + ", phone: " + phone + ", email: " + email);
//     // window.location.assign(`https://thejaingroup.co.in/dream_world_city/form_submit.php?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&enquiryType=${encodeURIComponent(enquiryType)}&utm_form_nam=${encodeURIComponent(utmFormNameValue)}`);
// }

// ================================================ amenities ==============================
let currentSlide = 0;
let slideInterval;
const slideIntervalTime = 3000;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const amenitiesListItems = document.querySelectorAll('.amenities-list li');

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;

    amenitiesListItems.forEach((item, idx) => {
        if (idx === currentSlide) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function nextSlide() {
    resetInterval();
    showSlide(currentSlide + 1);
}

function prevSlide() {
    resetInterval();
    showSlide(currentSlide - 1);
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideIntervalTime);
}

function startSlider() {
    showSlide(currentSlide); // Initial call to display the first slide
    slideInterval = setInterval(nextSlide, slideIntervalTime);
}

function stopSlider() {
    clearInterval(slideInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    const amenitiesListItems = document.querySelectorAll('.amenities-list li');
    if (amenitiesListItems.length > 0) {
        amenitiesListItems[0].classList.add('active');
    }
    amenitiesListItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            resetInterval();
            showSlide(index);
        });
    });

    const amenitiesSection = document.querySelector('.amenities');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startSlider();
            } else {
                stopSlider();
            }
        });
    }, observerOptions);

    observer.observe(amenitiesSection);
});



// ================================== floor plan ===============================================

let current = 0;
let floorPlanInterval;
//   const slideIntervalTime = 3000;

function floorPlansShowSlide(index) {
    const slides = document.querySelectorAll('.floor-plans-item');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        current = 0;
    } else if (index < 0) {
        current = totalSlides - 1;
    } else {
        current = index;
    }
    const offset = -current * 100;
    document.querySelector('.floor-plans-container').style.transform = `translateX(${offset}%)`;
}

function floorPlansnextSlide() {
    resetFloorPlanInterval();
    floorPlansShowSlide(current + 1);
}

function floorPlansprevSlide() {
    resetFloorPlanInterval();
    floorPlansShowSlide(current - 1);
}

function resetFloorPlanInterval() {
    clearInterval(floorPlanInterval);
    floorPlanInterval = setInterval(floorPlansnextSlide, 5000);
}

function startFloorPlanSlider() {
    floorPlansShowSlide(current); // Initial call to display the first slide
    floorPlanInterval = setInterval(floorPlansnextSlide, 5000);
}

function stopFloorPlanSlider() {
    clearInterval(floorPlanInterval);
}

// Master Plan
// let masterPlanCurrent = 0;
// let masterPlanInterval;

// function masterfloorPlansShowSlide(masterPlanIndex) {
//     const masterSlides = document.querySelectorAll('.master-floor-plans-item');
//     const mastertotalSlides = masterSlides.length;
//     if (masterPlanIndex >= mastertotalSlides) {
//         masterPlanCurrent = 0;
//     } else if (masterPlanIndex < 0) {
//         masterPlanCurrent = mastertotalSlides - 1;
//     } else {
//         masterPlanCurrent = masterPlanIndex;
//     }
//     const masterPlanOffset = -masterPlanCurrent * 100;
//     document.querySelector('.master-floor-plans-container').style.transform = `translateX(${masterPlanOffset}%)`;
// }

// function masterFloorPlansNextSlide() {
//     resetMasterPlanInterval();
//     masterfloorPlansShowSlide(masterPlanCurrent + 1);
// }

// function masterFloorPlansprevSlide() {
//     resetMasterPlanInterval();
//     masterfloorPlansShowSlide(masterPlanCurrent - 1);
// }

// function resetMasterPlanInterval() {
//     clearInterval(masterPlanInterval);
//     masterPlanInterval = setInterval(masterFloorPlansNextSlide, slideIntervalTime);
// }

// function startMasterPlanSlider() {
//     masterfloorPlansShowSlide(masterPlanCurrent); // Initial call to display the first slide
//     masterPlanInterval = setInterval(masterFloorPlansNextSlide, slideIntervalTime);
// }

// function stopMasterPlanSlider() {
//     clearInterval(masterPlanInterval);
// }

// Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const floorPlansSection = document.querySelector('.floor-plans-section');
    const masterPlanSection = document.querySelector('.floor-plans-tab-content');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startFloorPlanSlider();
            } else {
                stopFloorPlanSlider();
            }
        });
    }, observerOptions);

    const masterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startMasterPlanSlider();
            } else {
                stopMasterPlanSlider();
            }
        });
    }, observerOptions);

    observer.observe(floorPlansSection);
    masterObserver.observe(masterPlanSection);
});

// Floor Plan Tabs
const floorPlansTabs = document.getElementsByClassName('floor-plans-tab');
const floorPlansTabContents = document.getElementsByClassName('floor-plans-tab-content');

function floorPlanShowTab(tabIndex) {
    for (let content of floorPlansTabContents) {
        content.classList.remove('active');
        content.classList.add('hidden');
    }

    setTimeout(() => {
        floorPlansTabContents[tabIndex - 1].classList.remove('hidden');
        floorPlansTabContents[tabIndex - 1].classList.add('active');
    }, 300);
    for (let tab of floorPlansTabs) {
        tab.classList.remove('focus');
    }
    floorPlansTabs[tabIndex - 1].classList.add('focus');
}

floorPlansTabs[0].classList.add('focus');
floorPlanShowTab(1);

// Get the modal
var floorPlanModal = document.getElementById("imageModal");

// Get the modal image
var modalImg = document.getElementById("modalImage");

// Function to open the modal and display the image
function openModal(src) {
    floorPlanModal.style.display = "block";
    modalImg.src = src;
}

// Function to close the modal
function closeModal() {
    floorPlanModal.style.display = "none";
}

// Add click event listeners to all floor plan images

// ======================================== Floor Plan and Gallery image zoom ===================================
let gallerySlideInterval;  // renamed from slideInterval to avoid conflict
const slideTiming = 3000;

function startGallerySlideInterval() {
    gallerySlideInterval = setInterval(() => nextBtn.click(), slideTiming);
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const slider = carousel.querySelector('.carousel_track');
    let slides = [...slider.children];

    // Initial slides position, so user can go from first to last slide
    slider.prepend(slides[slides.length - 1]);

    // Auto sliding
    carousel.addEventListener('mouseover', () => clearInterval(gallerySlideInterval));
    carousel.addEventListener('mouseleave', startGallerySlideInterval);
    startGallerySlideInterval();
});


/*============================== gallery scroll ============================================== */

const gallery_carousel = document.querySelector('.gallery_carousel')
const slider = gallery_carousel.querySelector('.gallery_carousel_track-container .gallery_carousel_track')
let slides = [...slider.children]

// Initial slides position, so user can go from first to last slide (click to the left first)
slider.prepend(slides[slides.length - 1])

// Creating dot for each slide
const createDots = (gallery_carousel, initSlides) => {
    const dotsContainer = document.createElement('div')
    dotsContainer.classList.add('gallery_carousel_nav')

    initSlides.forEach((slide, index) => {
        const dot = document.createElement('button')
        dot.type = 'button'
        dot.classList.add('gallery_carousel_dot')
        dot.setAttribute('aria-label', `Slide number ${index + 1}`)
        slide.dataset.position = index
        slide.classList.contains('is-selected') && dot.classList.add('is-selected')
        dotsContainer.appendChild(dot)
    })

    gallery_carousel.appendChild(dotsContainer)

    return dotsContainer
}

// Updating relevant dot
const updateDot = slide => {
    const currDot = dotNav.querySelector('.is-selected')
    const targetDot = slide.dataset.position

    currDot.classList.remove('is-selected')
    dots[targetDot].classList.add('is-selected')
}

// Handling arrow buttons
const handleArrowClick = arrow => {
    arrow.addEventListener('click', () => {
        slides = [...slider.children]
        const currSlide = slider.querySelector('.is-selected')
        currSlide.classList.remove('is-selected')
        let targetSlide

        if (arrow.classList.contains('jsPrev')) {
            targetSlide = currSlide.previousElementSibling
            slider.prepend(slides[slides.length - 1])
        }

        if (arrow.classList.contains('jsNext')) {
            targetSlide = currSlide.nextElementSibling
            slider.append(slides[0])
        }

        targetSlide.classList.add('is-selected')
        updateDot(targetSlide)
    })
}

const buttons = gallery_carousel.querySelectorAll('.gallery_carousel_btn')
buttons.forEach(handleArrowClick)

// Handling dot buttons
const handleDotClick = dot => {
    const dotIndex = dots.indexOf(dot)
    const currSlidePos = slider.querySelector('.is-selected').dataset.position
    const targetSlidePos = slider.querySelector(`[data-position='${dotIndex}']`).dataset.position

    if (currSlidePos < targetSlidePos) {
        const count = targetSlidePos - currSlidePos
        for (let i = count; i > 0; i--) nextBtn.click()
    }

    if (currSlidePos > targetSlidePos) {
        const count = currSlidePos - targetSlidePos
        for (let i = count; i > 0; i--) prevBtn.click()
    }
}

const dotNav = createDots(gallery_carousel, slides)
const dots = [...dotNav.children]
const prevBtn = buttons[0]
const nextBtn = buttons[1]

dotNav.addEventListener('click', e => {
    const dot = e.target.closest('button')
    if (!dot) return
    handleDotClick(dot)
})

// Auto sliding
const slide_Timing = 3000
let interval
const slide_Interval = () => interval = setInterval(() => nextBtn.click(), slideTiming)

gallery_carousel.addEventListener('mouseover', () => clearInterval(interval))
gallery_carousel.addEventListener('mouseleave', slide_Interval)
slide_Interval()


// ============================ project video ===============================

document.getElementById('video-thumbnail').addEventListener('click', function () {
    var iframe = document.getElementById('video-iframe');
    var src = iframe.src;
    iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';

    document.getElementById('video-thumbnail').style.display = 'none';
    document.getElementById('video-wrapper').style.display = 'block';
});

//====================================== location advantage accordion =====================================
document.addEventListener("DOMContentLoaded", function () {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});

// ======================================= home loan ================================

document.addEventListener('DOMContentLoaded', () => {
    const homeLoanSection = document.querySelector('.home-loan');
    const bankLogos = document.querySelectorAll('.bank-logos img');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bankLogos.forEach((img, index) => {
                    setTimeout(() => {
                        img.classList.add('visible');
                        img.classList.remove('hidden');
                    }, index * 100); // Stagger the animations
                });
                observer.unobserve(homeLoanSection); // Stop observing after the first trigger
            }
        });
    }, observerOptions);

    bankLogos.forEach(img => {
        img.classList.add('hidden');
    });

    observer.observe(homeLoanSection);
});




// ============================================= footer =========================================

document.addEventListener('DOMContentLoaded', () => {
    const footerSection = document.querySelector('footer');
    const elements = footerSection.querySelectorAll('.developer-office, .site-address');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    console.log("footer===============================")


    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("footer===============================")
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                        element.classList.remove('hidden');
                    }, index * 600); // Stagger the animations with 300ms delay
                });
                observer.unobserve(footerSection); // Stop observing after the first trigger
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        element.classList.add('hidden');
    });

    observer.observe(footerSection);
});
