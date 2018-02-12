const text = document.getElementById('text')

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;

const instructions = document.getElementById('instructions');

const startRecord = () => {
  instructions.className = '';
  instructions.textContent = 'Запись голоса. Говорите в микрофон';
  instructions.classList.add('success');
}

const stopRecord = () => {
  instructions.className = '';
  instructions.textContent = 'Запись приостановлена';
  instructions.classList.add('danger');
}

const writeText = event => {
  text.value += event.results[event.resultIndex][0].transcript
}

recognition.onstart = startRecord

recognition.onerror = stopRecord

recognition.onresult = writeText

document.addEventListener('keyup', ev => {
  if (ev.key === 'r') {
    recognition.start();
  } else if (ev.key === 's') {
    recognition.abort();
  }
})
