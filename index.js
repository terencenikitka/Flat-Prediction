const predictionBtn = document.getElementById('getPrediction')
let div = document.getElementById('innerDiv')
let p = document.createElement('p')
console.log(div)
let predictionText = '' 
const img = document.getElementById('img')
// const nameInput = document.querySelector('form').name
// const imgInput = document.querySelector('form').image
const url = 'http://127.0.0.1:3000/predictions'
// creating form event
const form = document.querySelector('form')
form.addEventListener('submit',(e)=>{
e.preventDefault()



console.log(e.target.name.value)
})
predictionBtn.addEventListener('click', ((e)=>{
    p.innerText = 'today\'s prediction is ...'
  div.append(p)


fetch(url)
.then((p)=>p.json())
.then((arr)=>{

let randomId = Math.floor(arr.length*Math.random())+1

arr.forEach(e => {
  if (e.id === randomId){predictionText = e.prediction
  img.src = e.image}
  console.log(randomId)
});

})


setTimeout(()=>{alert(predictionText)},350)
}))

