document.addEventListener("DOMContentLoaded", function() {

   //----- Sidenav Init -----

   let sidenav = document.querySelector(".sidenav");
   M.Sidenav.init(sidenav);

   //----- Load Page -----

   let mainOffset = document.querySelector("main").offsetHeight;
   let page = window.location.hash.substr(1);
   if (page == "") page = "telusur";
   loadPage(page);
 
   function loadPage(page) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
         if (this.readyState == 4) {
            let container = document.querySelector("main");
            if (this.status == 200) {
               container.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
               container.innerHTML = '<div class="center-align error-notification"><i class="material-icons">sentiment_dissatisfied</i><h4>Halaman Tidak Ditemukan</h4></div>';
            } else {
               container.innerHTML = '<div class="center-align error-notification"><i class="material-icons">sentiment_dissatisfied</i><h4>Halaman Tidak Dapat Diakses</h4></div>';
            }

            //----- Button Event
            
            document.querySelectorAll(".toggle-btn").forEach(function(e) {
               e.addEventListener("click", function(event) {                  
                  //--- Close sidenav
                  M.Sidenav.getInstance(sidenav).close();
                  //--- Load page
                  page = event.target.getAttribute("href").substr(1);
                  loadPage(page);
                  //--- Go to top <main>
                  document.documentElement.scrollTop = mainOffset + 250;                  
               });
            });

            //----- Clamp Init

            document.querySelectorAll('.card .card-content p:last-child').forEach(function(e){
               $clamp(e, {clamp: 3});
            });

            document.querySelectorAll('.featured-card .card-content p:last-child').forEach(function(e){
               $clamp(e, {clamp: 6});
            });

            //----- Carousel Init

            let carousel = document.querySelector('.carousel');
            M.Carousel.init(carousel);
         }
      };
      xhttp.open("GET", "halaman/" + page + ".html", true);
      xhttp.send();
   }
  
});

//----- Register Service Worker

if ("serviceWorker" in navigator) {
   window.addEventListener("load", function() {
      navigator.serviceWorker
      .register("../service-worker.js")
      .then(function() {
         console.log("Pendaftaran Service Worker berhasil!");
      })
      .catch(function() {
         console.log("Pendaftaran Service Worker gagal!");
      });
   });
} else {
   console.log("Service Worker belum didukung di browser ini.");
}