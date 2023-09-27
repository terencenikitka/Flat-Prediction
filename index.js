const predictionBtn = document.getElementById('getPrediction')
let div = document.getElementById('innerDiv')
let p = document.createElement('p')
const deletBtn = document.getElementById('delete button')
const likeBtn = document.getElementById('like button')
let theChosenPrediction
const pic= document.querySelector('#img')
const form= document.querySelector('form')


fetch('http://localhost:3000/predictions')
.then(r => r.json())
.then(predictionsArray => {
  /// display prediction button event
  predictionBtn.addEventListener('click', ((e)=>{
    p.innerText = 'today\'s prediction is ...'
    div.append(p)
    theChosenPrediction= predictionsArray[(Math.floor(Math.random() * predictionsArray.length))];
    setTimeout(()=>{
      alert(theChosenPrediction.prediction)
      }, 300)
    pic.src= theChosenPrediction.image
    pic.style.display='';
    deletBtn.style.display = ''
    likeBtn.style.display = ''
    likeBtn.innerHTML = 'Like'
    likeBtn.disabled = false
  //// delete button event
  deletBtn.addEventListener('click',((e)=>{
    deletePrediction(theChosenPrediction.id)
    pic.style.display='none';
    predictionsArray.forEach((el)=>{if(el.id===theChosenPrediction.id)predictionsArray.splice( (el.id) - 1,el.id)})
    likeBtn.style.display='none'
    deletBtn.style.display = 'none'
  }))


  // img eventListenr
  pic.addEventListener('mouseenter', (e)=>{
    setTimeout(()=>{
    pic.style.display='none'
    deletBtn.style.display='none'
    likeBtn.style.display='none'},
    500)
  })
  pic.addEventListener('mouseout',((e)=>{
    setTimeout (()=>{pic.style.display=''
    deletBtn.style.display=''
    likeBtn.style.display=''},510)
  }))

  // like button event 


  }))
  likeBtn.addEventListener('click',((e)=>{
    likeBtn.innerHTML =` You liked that prediction ${++theChosenPrediction.likes} times`
    likeFunc(theChosenPrediction)
  }))

  // submit event
  form.addEventListener('submit', e => {
    e.preventDefault()
    const newPrediction= {
      prediction: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    submitNewPrediction(newPrediction, predictionsArray)
    form.reset()
  })
})

//delete btn function 
function deletePrediction(id){
  fetch(`http://localhost:3000/predictions/${id}`,{
    method:'DELETE',
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
}

/// like Function 

function likeFunc (prediction){
  fetch (`http://localhost:3000/predictions/${prediction.id}`,{
    method: "PATCH",
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify(prediction)
  })
}

// submit function
function submitNewPrediction(predictionObject, array) {
  fetch ('http://localhost:3000/predictions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(predictionObject)
  })
  .then(r => {
    if (r.ok) {
      return r.json()
    } else {
      throw r.statusText
    }
  })
  .then(predictionObject => {
    array.push(predictionObject)
  })
  .catch(error => {
    console.log(error)
    alert(error)
  })
}