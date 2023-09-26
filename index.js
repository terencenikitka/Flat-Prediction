const predictionBtn = document.getElementById('getPrediction')
let div = document.getElementById('innerDiv')
let p = document.createElement('p')
const deletBtn = document.getElementById('delete button')
const likeBtn = document.getElementById('like button')
console.log(div)
cacheLike = {}
let theChosenPrediction
const pic= document.querySelector('#img')
console.log(likeBtn)



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
console.log(theChosenPrediction.id)

}))

// like button event 


  }))
likeBtn.addEventListener('click',((e)=>{
  console.log('hey')
  // console.log(likesTime)
  likeBtn.innerHTML =` You liked that prediction ${++theChosenPrediction.likes} times`
  // likeBtn.disabled = true
  likeFunc(theChosenPrediction)
}))
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