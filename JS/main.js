/* ============================================
   NEL WINSTON HOTEL - Part 3 JavaScript
   Author: Pfuneko Chauke
   Student ID: ST10520226
   Date: 2026-06-19
   ============================================ */

// DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    initBookingForm();
    initContactForm();
    initDateValidation();
});

/* ---------- 1. Lightbox Gallery ---------- */
function openLightbox(imgElement) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCaption = document.getElementById('lightbox-caption');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imgElement.src;
        lightboxImg.alt = imgElement.alt;
        if (lightboxCaption) {
            var caption = imgElement.parentElement.querySelector('.gallery-caption');
            lightboxCaption.textContent = caption ? caption.textContent : imgElement.alt;
        }
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

/* ---------- 2. Accordion (Pricing) ---------- */
function toggleAccordion(button) {
    var item = button.parentElement;
    var isActive = item.classList.contains('active');

    // Close all accordion items
    var allItems = document.querySelectorAll('.accordion-item');
    for (var i = 0; i < allItems.length; i++) {
        allItems[i].classList.remove('active');
    }

    // Open clicked item if it was not active
    if (!isActive) {
        item.classList.add('active');
    }
}

/* ---------- 3. Room Selection from Accordion ---------- */
function selectRoom(roomType) {
    var select = document.getElementById('room-type');
    if (select) {
        select.value = roomType;
        var form = document.getElementById('booking-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth' });
        }
        select.style.borderColor = '#e94560';
        setTimeout(function() {
            select.style.borderColor = '';
        }, 2000);
    }
}

/* ---------- 4. Services Search/Filter ---------- */
function filterServices() {
    var searchInput = document.getElementById('service-search');
    var searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    var cards = document.querySelectorAll('.service-card');
    var noResults = document.getElementById('no-results');
    var hasResults = false;

    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var name = card.getAttribute('data-name').toLowerCase();
        var title = card.querySelector('h3').textContent.toLowerCase();
        var desc = card.querySelector('p').textContent.toLowerCase();

        if (name.indexOf(searchTerm) > -1 || 
            title.indexOf(searchTerm) > -1 || 
            desc.indexOf(searchTerm) > -1) {
            card.style.display = '';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    }

    if (noResults) {
        noResults.style.display = hasResults ? 'none' : 'block';
    }
}

// Live search on input
document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('service-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterServices);
    }
});

/* ---------- 5. Booking Form Validation ---------- */
function initBookingForm() {
    var form = document.getElementById('booking-form-element');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        var isValid = true;

        var fullName = document.getElementById('full-name');
        if (!fullName || fullName.value.trim().length < 2) {
            showError('full-name-error', 'Please enter your full name (at least 2 characters).');
            isValid = false;
        }

        var email = document.getElementById('email');
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email.value)) {
            showError('email-error', 'Please enter a valid email address.');
            isValid = false;
        }

        var phone = document.getElementById('phone');
        var phonePattern = /^[0-9+\s-]{10,}$/;
        if (!phone || !phonePattern.test(phone.value)) {
            showError('phone-error', 'Please enter a valid phone number (at least 10 digits).');
            isValid = false;
        }

        var checkIn = document.getElementById('check-in');
        if (!checkIn || !checkIn.value) {
            showError('check-in-error', 'Please select a check-in date.');
            isValid = false;
        } else {
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            var checkInDate = new Date(checkIn.value);
            if (checkInDate < today) {
                showError('check-in-error', 'Check-in date cannot be in the past.');
                isValid = false;
            }
        }

        var checkOut = document.getElementById('check-out');
        if (!checkOut || !checkOut.value) {
            showError('check-out-error', 'Please select a check-out date.');
            isValid = false;
        } else if (checkIn && checkIn.value) {
            var checkInDate = new Date(checkIn.value);
            var checkOutDate = new Date(checkOut.value);
            if (checkOutDate <= checkInDate) {
                showError('check-out-error', 'Check-out date must be after check-in date.');
                isValid = false;
            }
        }

        var roomType = document.getElementById('room-type');
        if (!roomType || !roomType.value) {
            showError('room-type-error', 'Please select a room type.');
            isValid = false;
        }

        var guests = document.getElementById('guests');
        if (!guests || guests.value < 1 || guests.value > 6) {
            showError('guests-error', 'Please enter a valid number of guests (1-6).');
            isValid = false;
        }

        if (isValid) {
            showBookingSuccess();
            form.reset();
        }
    });
}

function showError(elementId, message) {
    var errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    var errors = document.querySelectorAll('.error-msg');
    for (var i = 0; i < errors.length; i++) {
        errors[i].textContent = '';
    }
}

function showBookingSuccess() {
    var successDiv = document.getElementById('booking-success');
    var details = document.getElementById('booking-details');

    if (successDiv) {
        var name = document.getElementById('full-name').value;
        var roomType = document.getElementById('room-type');
        var roomText = roomType.options[roomType.selectedIndex].text;
        var checkIn = document.getElementById('check-in').value;
        var checkOut = document.getElementById('check-out').value;

        if (details) {
            details.innerHTML = '<strong>Name:</strong> ' + name + '<br>' +
                               '<strong>Room:</strong> ' + roomText + '<br>' +
                               '<strong>Check-in:</strong> ' + checkIn + '<br>' +
                               '<strong>Check-out:</strong> ' + checkOut;
        }

        successDiv.style.display = 'block';
        successDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ---------- 6. Contact Form Validation ---------- */
function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        var isValid = true;

        var name = document.getElementById('contact-name');
        if (!name || name.value.trim().length < 2) {
            showError('contact-name-error', 'Please enter your name (at least 2 characters).');
            isValid = false;
        }

        var email = document.getElementById('contact-email');
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email.value)) {
            showError('contact-email-error', 'Please enter a valid email address.');
            isValid = false;
        }

        var phone = document.getElementById('contact-phone');
        if (phone && phone.value) {
            var phonePattern = /^[0-9+\s-]{10,}$/;
            if (!phonePattern.test(phone.value)) {
                showError('contact-phone-error', 'Please enter a valid phone number.');
                isValid = false;
            }
        }

        var messageType = document.getElementById('message-type');
        if (!messageType || !messageType.value) {
            showError('message-type-error', 'Please select a message type.');
            isValid = false;
        }

        var message = document.getElementById('contact-message');
        if (!message || message.value.trim().length < 10) {
            showError('contact-message-error', 'Please enter a message (at least 10 characters).');
            isValid = false;
        }

        if (isValid) {
            showContactSuccess();
            form.reset();
        }
    });
}

function showContactSuccess() {
    var successDiv = document.getElementById('contact-success');
    if (successDiv) {
        successDiv.style.display = 'block';
        successDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ---------- 7. Date Validation (min dates) ---------- */
function initDateValidation() {
    var checkIn = document.getElementById('check-in');
    var checkOut = document.getElementById('check-out');

    if (checkIn) {
        var today = new Date().toISOString().split('T')[0];
        checkIn.setAttribute('min', today);

        checkIn.addEventListener('change', function() {
            if (checkOut) {
                checkOut.setAttribute('min', checkIn.value);
                if (checkOut.value && checkOut.value <= checkIn.value) {
                    checkOut.value = '';
                }
            }
        });
    }
}

/* ---------- 8. Interactive Map (Leaflet + OpenStreetMap) ---------- */
function initMap() {
    var mapContainer = document.getElementById('hotel-map');
    if (!mapContainer) return;

    if (typeof L === 'undefined') {
        setTimeout(initMap, 500);
        return;
    }

    var lat = -33.9249;
    var lng = 18.4241;

    var map = L.map('hotel-map').setView([lat, lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup('<strong>NEL WINSTON HOTEL</strong><br>123 Winston Avenue, New-town').openPopup();
}

/* ---------- 9. Smooth Scroll for Anchor Links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ---------- 10. Navbar Scroll Effect ---------- */
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
    }
});
