const predictionBtn = document.getElementById('getPrediction')
let div = document.getElementById('innerDiv')
let p = document.createElement('p')
console.log(div)
predictionBtn.addEventListener('click', ((e)=>{
    p.innerText = 'today\'s prediction is ...'
  div.append(p)
setTimeout(()=>{alert('there is no fork')},0)
}))