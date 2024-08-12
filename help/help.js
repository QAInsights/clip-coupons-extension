document.addEventListener("DOMContentLoaded", function () {
  function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // Add event listeners to tabs
  document.querySelectorAll(".tablinks").forEach(function (tablink) {
    tablink.addEventListener("click", function (event) {
      openTab(event, this.getAttribute("data-tab"));
    });
  });

  // Open the default tab
  document.getElementById("defaultOpen").click();
});
