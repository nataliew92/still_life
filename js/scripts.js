// =============================================================================
// FLORA — SCRIPTS
// =============================================================================


// Cached element references (grabbed once rather than on every scroll event)
var nav          = document.getElementById('nav');
var navLogo      = nav.querySelector('.nav__logo');
var navLinks     = nav.querySelector('.nav__links');
var navCta       = nav.querySelector('.nav__cta');
var dividerLines = document.querySelectorAll('.divider__line');


// -----------------------------------------------------------------------
// Scroll effects for nav and divider
// -----------------------------------------------------------------------
window.addEventListener('scroll', function () {
  var scrolled      = window.scrollY;
  var windowHeight  = window.innerHeight;

  // Nav: switch to frosted-glass after 80px
  if (scrolled > 80) {
    nav.classList.add('nav--scrolled');
    navLogo.classList.add('nav__logo--dark');
    navLinks.classList.add('nav__links--dark');
    navCta.classList.add('nav__cta--dark');
  } else {
    nav.classList.remove('nav--scrolled');
    navLogo.classList.remove('nav__logo--dark');
    navLinks.classList.remove('nav__links--dark');
    navCta.classList.remove('nav__cta--dark');
  }

  // Divider: shrink the further each line is from the centre of the viewport
  dividerLines.forEach(function (line) {
    var rect               = line.getBoundingClientRect();
    var distanceFromCenter = Math.abs(rect.top - windowHeight / 2);
    var scale              = Math.max(0.1, 1 - (distanceFromCenter / windowHeight));
    line.style.transform   = 'scaleX(' + scale + ')';
  });
});


// -----------------------------------------------------------------------
// Scroll animations
// -----------------------------------------------------------------------
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-in').forEach(function (el) {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});


// -----------------------------------------------------------------------
// Scent notes animation
// -----------------------------------------------------------------------
var scentItems = document.querySelectorAll('.scent__item');

document.querySelectorAll('.scent__trigger').forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    var clickedItem = trigger.parentElement;
    var wasActive   = clickedItem.classList.contains('is-active');

    // Close all
    scentItems.forEach(function (item) {
      item.classList.remove('is-active');
      item.querySelector('.scent__trigger').setAttribute('aria-expanded', 'false');
    });

    // Open clicked one (unless it was already open — toggle behaviour)
    if (!wasActive) {
      clickedItem.classList.add('is-active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});


// -----------------------------------------------------------------------
// Size selection, updates price display and active state of buttons
// -----------------------------------------------------------------------
function selectSize(btn, price) {
  document.querySelectorAll('.buy__size-btn').forEach(function (b) {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  document.getElementById('price-display').innerHTML = '<sup>£</sup>' + price.replace('£', '');
}


// -----------------------------------------------------------------------
// Demo add to bag notification
// -----------------------------------------------------------------------
function showNotification() {
  var notification = document.createElement('div');
  notification.textContent = '✦ This is a demo — no purchase has been made.';
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');
  notification.className = 'notification';
  document.body.appendChild(notification);

  setTimeout(function () {
    notification.style.opacity = '0';
    setTimeout(function () {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}
