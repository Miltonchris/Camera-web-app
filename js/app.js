//Globals 

let width = 500,
  height = 0,
  filter = 'none',
  streaming = false;


  //DOM ELEMENTS
  const video = document.getElementById('video');
  const snapshot = document.getElementById('snapshot');
  const canvas = document.getElementById('canvas');
  const photos = document.getElementById('photos');
  const clear = document.getElementById('clear-btn');
  const photoFilter = document.getElementById('filter');

  //Media
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream){
      video.srcObject =stream;

      video.play();
  })
  .catch(function(err) {
    console.log(`Error: £{err}`);
  });

  // Play when is ready 
  video.addEventListener('canplay', function(e){
    if(!streaming){
      // set video canvas height 
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('height', height);
      canvas.setAttribute('width', width);

      streaming = true;
    }
  },false);

  snapshot.addEventListener('click', function(e){
    takePicture();

    e.preventDefault();
  },false);

  //event to change the filter
  photoFilter.addEventListener('change', function(e){

    filter = e.target.value;

    video.style.filter =filter;

    e.preventDefault();
  });

  // clear event
  clear.addEventListener('click', function(e){

    photos.innerHTML = '';

    filter = 'none';

    video.style.filter =filter;
    photoFilter.selectedIndex = 0;
  });

  function takePicture(){
    // create canvas
    const context = canvas.getContext('2d');
    if(width && height ){
      
      canvas.width = width;
      canvas.height = height;
      //create the image to the canvas 
      context.drawImage(video, 0,0, width, height);

      // create the image from the canvas
      const imgUrl = canvas.toDataURL('img/png');

      // create img element
      const img = document.createElement('img');

      // set img src 
      img.setAttribute('src', imgUrl);

      img.style.filter = filter;

      photos.appendChild(img);
    }
  }