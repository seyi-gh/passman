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

//? Add service button logic
document.getElementById('service_actions-add_button').addEventListener('click', async () => {
  let response = await fetch('/service/init', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(response => response);
  if (response.hasOwnProperty('id')) {
    notificationPush(`Success in creating the service [${response['id']}]`, 'success');
  }
  else {
    notificationPush(`Error in creating the service`, 'error')
  }
});

document.getElementById('service_actions-search_button').addEventListener('click', async (e) => {
  e.preventDefault();
  let query = '_name:unnamed';
  let response = await fetch('/service/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query
    })
  }).then(response => response.json()).then(response => response);
  notificationPush(JSON.stringify(response), 'error');
});