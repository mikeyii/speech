// const form = document.getElementById('speech-form')
const text = document.getElementById('text')
// const voice = document.getElementById('voice')
// const message = new SpeechSynthesisUtterance();
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;

let recognitionStarted = false;
// const stopBtn = document.getElementById('stop');
const startRecordBtn = document.getElementById('startRecord');
const stopRecordBtn = document.getElementById('stopRecord');
const instructions = document.querySelector('.instructions');
// let voices = [];

// speechSynthesis.onvoiceschanged = function() {
//   const voices = speechSynthesis.getVoices();
//   if (!voice.querySelector('option')) {
//     speechSynthesis.getVoices().forEach((el, i) => {
//       const option = document.createElement('option');
//       option.value = i;
//       option.textContent = `${el.name} ${el.lang}`;
//       voice.appendChild(option);
//     });
//     voice.addEventListener('change', (ev) => {
//       message.voice = voices[voice.value];
//     })
//   }
// }


// form.addEventListener('submit', (ev) => {
//   ev.preventDefault();
//   message.text = text.value;
//   speechSynthesis.speak(message);
// })

// stopBtn.addEventListener('click', (ev) => {
//   speechSynthesis.cancel();
// })

recognition.onstart = function() {
  instructions.className = 'instructions';
  instructions.textContent = 'Запись голоса. Говорите в микрофон';
  instructions.classList.add('success');
}

recognition.onspeechend = function() {
  instructions.className = 'instructions';
  instructions.textContent = 'Вы перестали говорить и запись голоса прекратилась';
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

startRecord.addEventListener('click', ev => {
  recognition.start();
  recognitionStarted = true;
})

stopRecordBtn.addEventListener('click', ev => {
  recognitionStarted = false;
  recognition.stop();
})
