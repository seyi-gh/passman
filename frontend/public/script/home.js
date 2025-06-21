const notificationMessage = document.querySelector('#navbar-notification_center .message');

function notificationPush(message, status) {
  //? Change colors of status message
  if (notificationMessage.classList.contains('sucess') && status == 'error')
    notificationMessage.classList.remove('sucess');
  else if (notificationMessage.classList.contains('error') && status == 'success')
    notificationMessage.classList.remove('error');
  notificationMessage.classList.add(status);

  notificationMessage.textContent = message;
}

const serviceAction_add = document.querySelector('.button_add');
serviceAction_add.addEventListener('click', async () => {
  let response = await fetch('/service/init', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(response => response);
  console.log(response);
  if (response.hasOwnProperty('id')) {
    notificationPush(`Success in creating the service [${response['id']}]`, 'success');
  }
  else {
    notificationPush(`Error in creating the service`, 'error')
  }
});