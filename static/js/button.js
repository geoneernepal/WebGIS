const currentbtn = document.querySelectorAll(".nav-link");
const currentDiv = document.querySelectorAll(".fade");
const checkBoxes = document.querySelector(".checkBoxDiv")
const rightPaneTop = document.querySelector(".right-pane-top")
const rightPaneBottom = document.querySelector(".right-pane-bottom")
const checkbox = document.querySelectorAll(".checkBox")
const container = document.querySelector("#container")
const draggable = document.querySelector(".right-pane-top")
const dropzone = document.querySelector(".file-upload")

currentbtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    currentbtn.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.toggle("active");
  });
});

currentbtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    currentDiv.forEach((div) => div.classList.remove("show"));
    currentDiv.forEach((div) => div.classList.remove("active"));
    let targetDivId = e.target.getAttribute("data-bs-target").substring(1);
    toggleShow(document.getElementById(targetDivId));
  });   
});

const toggleShow = (e) => {
  e.classList.toggle("show");
  e.classList.toggle("active");
};


const showHide = (e) => {
    if(e.target.type !== "checkbox")
    return;

    if(e.target.name === "legend")
        rightPaneTop.style.display = e.target.checked ? "block" : "none"
    else 
        rightPaneBottom.style.display = e.target.checked ? "block" : "none"
      
}

checkbox.forEach(box => {
    box.addEventListener("click",showHide)
})

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
  
    if (e.target === draggable) {
      active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
  }

  function drag(e) {
    if (active) {
    
      e.preventDefault();
    
      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, draggable);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }

//   file upload drag and drop

// Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
dropzone.addEventListener('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
});

// Get file data on drop
dropzone.addEventListener('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files; // Array of all files

    for (var i=0, file; file=files[i]; i++) {
        if (file.type.match(/image.*/)) {
            var reader = new FileReader();

            reader.onload = function(e2) {
                // finished reading file data.
                var img = document.createElement('img');
                img.src= e2.target.result;
                document.body.appendChild(img);
            }

            reader.readAsDataURL(file); // start reading the file data.
        }
    }
});

  