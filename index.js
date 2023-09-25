const predictionBtn = document.getElementById('getPrediction')
let div = document.getElementById('innerDiv')
let p = document.createElement('p')
console.log(div)
const pic= document.querySelector('div img')
console.log(pic)



fetch('http://localhost:3000/predictions')
.then(r => r.json())
.then(predictionsArray => {
  predictionBtn.addEventListener('click', ((e)=>{
    p.innerText = 'today\'s prediction is ...'
    div.append(p)
    const theChosenPrediction= predictionsArray[(Math.floor(Math.random() * predictionsArray.length))];
    setTimeout(()=>{
      alert(theChosenPrediction.prediction)
      }, 0)
      pic.src= theChosenPrediction.image
  }))
})
