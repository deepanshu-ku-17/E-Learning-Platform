document.addEventListener('DOMContentLoaded', function() {
   // Dark mode toggle
   const toggleBtn = document.getElementById('toggle-btn');
   const body = document.body;
   let darkMode = localStorage.getItem('dark-mode');
   const enableDarkMode = () => {
      toggleBtn.classList.replace('fa-sun', 'fa-moon');
      body.classList.add('dark');
      localStorage.setItem('dark-mode', 'enabled');
   }
   const disableDarkMode = () => {
      toggleBtn.classList.replace('fa-moon', 'fa-sun');
      body.classList.remove('dark');
      localStorage.setItem('dark-mode', 'disabled');
   }
   if (darkMode === 'enabled') {
      enableDarkMode();
   }
   toggleBtn.addEventListener('click', () => {
      darkMode = localStorage.getItem('dark-mode');
      if (darkMode === 'disabled') {
         enableDarkMode();
      } else {
         disableDarkMode();
      }
   });
   // Profile dropdown
   const userBtn = document.getElementById('user-btn');
   const profile = document.querySelector('.header .flex .profile');
   userBtn.onclick = () => {
      profile.classList.toggle('active');
      search.classList.remove('active');
   }
   // Search form
   const searchBtn = document.getElementById('search-btn');
   const search = document.querySelector('.header .flex .search-form');
   searchBtn.onclick = () => {
      search.classList.toggle('active');
      profile.classList.remove('active');
   }
   // Sidebar toggle
   const menuBtn = document.getElementById('menu-btn');
   const sideBar = document.querySelector('.side-bar');
   menuBtn.onclick = () => {
      sideBar.classList.toggle('active');
      body.classList.toggle('active');
   }
   const closeBtn = document.getElementById('close-btn');
   closeBtn.onclick = () => {
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
   // Window scroll event
   window.onscroll = () => {
      profile.classList.remove('active');
      search.classList.remove('active');
      if (window.innerWidth < 1200) {
         sideBar.classList.remove('active');
         body.classList.remove('active');
      }
   }
   // Video player functionality (if applicable)
   const videoPlayer = document.getElementById('video');
   if (videoPlayer) {
      const playPauseBtn = document.getElementById('play-pause-btn');
      playPauseBtn.onclick = () => {
         if (videoPlayer.paused) {
               videoPlayer.play();
               playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
         } else {
               videoPlayer.pause();
               playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
         }
      }
   }
   // Comment form submission (if applicable)
   const commentForm = document.getElementById('comment-form');
   if (commentForm) {
      commentForm.onsubmit = (e) => {
         e.preventDefault();
           // Add your comment submission logic here
         console.log('Comment submitted');
         commentForm.reset();
      }
   }
   // Like button functionality (if applicable)
   const likeBtn = document.getElementById('like-btn');
   if (likeBtn) {
      likeBtn.onclick = () => {
         likeBtn.classList.toggle('active');
           // Add your like functionality here
         console.log('Video liked/unliked');
      }
   }
});

document.addEventListener('DOMContentLoaded', function() {
   const searchForm = document.querySelector('.search-tutor');
   const noResultsMessage = document.getElementById('noResultsMessage');
   const teacherBoxes = document.querySelectorAll('.box-container .box');
   searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchTerm = this.querySelector('input[name="search_box"]').value;
      performSearch(searchTerm);
   });
   function performSearch(searchTerm) {
      let resultsFound = false;
      teacherBoxes.forEach(box => {
         const teacherName = box.querySelector('h3').textContent.toLowerCase();
         if (teacherName.includes(searchTerm.toLowerCase())) {
               box.style.display = 'block';
               resultsFound = true;
         } else {
               box.style.display = 'none';
         }
      });
      if (!resultsFound) {
         noResultsMessage.style.display = 'block';
      } else {
         noResultsMessage.style.display = 'none';
      }
   }
});
function performSearch(searchTerm) {
   console.log('Searching for:', searchTerm);
   let resultsFound = false;
   teacherBoxes.forEach(box => {
      const teacherName = box.querySelector('h3').textContent.toLowerCase();
      console.log('Checking teacher:', teacherName);
      if (teacherName.includes(searchTerm.toLowerCase())) {
         box.style.display = 'block';
         resultsFound = true;
      } else {
         box.style.display = 'none';
      }
   });
   console.log('Results found:', resultsFound);
   if (!resultsFound) {
      console.log('Showing no results message');
      noResultsMessage.style.display = 'block';
   } else {
      noResultsMessage.style.display = 'none';
   }
}
