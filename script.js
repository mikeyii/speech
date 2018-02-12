const text = document.getElementById('text')

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;

let recognitionStarted = false;
const startRecordBtn = document.getElementById('startRecord');
const stopRecordBtn = document.getElementById('stopRecord');
const instructions = document.querySelector('.instructions');

recognition.onstart = function() {
  instructions.className = 'instructions';
  instructions.textContent = 'Запись голоса. Говорите в микрофон';
  instructions.classList.add('success');
}

recognition.onspeechend = function() {
  instructions.className = 'instructions';
  instructions.textContent = 'Запись голоса преостановлена';
  instructions.classList.add('danger');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.className = 'instructions';
    instructions.textContent ='Голос не был обнаружен. Попробуйте снова';
    instructions.classList.add('error');
  };
}

recognition.onresult = function(event) {
  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

  text.value += transcript;
}

// startRecord.addEventListener('click', ev => {
//   recognition.start();
// })

// stopRecordBtn.addEventListener('click', ev => {
//   recognition.abort();
// })


document.addEventListener('keyup', ev => {
  if (ev.key === 'r') {
    recognition.start();
  } else if (ev.key === 's') {
    recognition.abort();
  }
})
