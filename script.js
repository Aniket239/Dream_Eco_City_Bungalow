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
const side_icon = document.getElementById('side_icon');
const nav_items = document.querySelectorAll('.nav-items li a');
function addShadowOnScroll() {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
        nav.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
        nav.style.backdropFilter = 'blur(15px)';
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        nav.classList.add('scrolled');
        side_icon.style.display = 'flex'
        nav_items.forEach(items => {
            items.style.color = '#986048'
        })
    } else {
        nav.style.boxShadow = "none";
        nav.style.backdropFilter = 'none';
        nav.style.backgroundColor = 'transparent';
        nav.classList.remove('scrolled');
        side_icon.style.display = 'none'
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



