const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const counter = document.getElementById('counter');
const download = document.getElementById('download');


let index = 0;
let scale = 1;

// Open
images.forEach((img, i) => {
  img.addEventListener('click', () => {
    index = i;
    showImage();
    lightbox.style.display = 'flex';
  });
});

// Show Image
function showImage() {
  const img = images[index];
  lightboxImg.src = img.src;
  caption.textContent = img.alt;
  counter.textContent = `${index + 1}   / ${images.length}`;
  download.href = img.src;
  scale = 1;
  lightboxImg.style.transform = "scale(1)";
}


function shuffleImages() {
  const gallery = document.querySelector('.gallery');
  const images = Array.from(gallery.children);

  // Fisher-Yates shuffle
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  // Re-append in new order
  gallery.innerHTML = '';
  images.forEach(img => gallery.appendChild(img));
}



// Next / Prev
document.getElementById('next').onclick = () => {
  index = (index + 1) % images.length;
  showImage();
};

document.getElementById('prev').onclick = () => {
  index = (index - 1 + images.length) % images.length;
  showImage();
};

// Close
document.querySelector('.close').onclick = () => {
  lightbox.style.display = 'none';
};

// Keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') document.getElementById('next').click();
  if (e.key === 'ArrowLeft') document.getElementById('prev').click();
  if (e.key === 'Escape') lightbox.style.display = 'none';
});

// Zoom (scroll)
lightboxImg.addEventListener('wheel', e => {
  e.preventDefault();
  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(1, scale), 3);
  lightboxImg.style.transform = `scale(${scale})`;
});

// Swipe (mobile)
let startX = 0;

lightbox.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) document.getElementById('next').click();
  if (endX - startX > 50) document.getElementById('prev').click();
});

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector('.gallery');

  // Duplicate images
  const imgs = gallery.innerHTML;
  gallery.innerHTML += imgs + imgs;

  // Shuffle images
 // shuffleImages();

  // Rebind lightbox click events
  setupGallery();
});


