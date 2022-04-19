 //get the converation.
  // var headers = {"Authorization": "Basic sZ4vbB1IUKkiZtlDAdz"};
  // var options = { headers: headers };
  //   const getConversations = async () => {
  //     var headers = {"Authorization": "Basic <%= encode(iparam.apiKey) %>"};
  //     var options = { headers: headers };
  //   var url = "https://hdufsixcv.freshdesk.com/a/tickets/7?include=conversations";
  //   $request.get(url, options)
  //   .then(function(data) {
  //     console.log(data)
  //   },
  //   function(error) {
  //     console.log(error)
  //   }
  //   );
  // }
  // getConversations();

  // document.onreadystatechange = function () {
//   if (document.readyState === 'interactive') renderApp();

//   function renderApp() {
//     var onInit = app.initialized();

//     onInit.then(getClient).catch(handleErr);

//     function getClient(_client) {
//       window.client = _client;
//       client.events.on('app.activated', onAppActivate);
//     }
//   }
// };

// function onAppActivate() {

//   try{
//   var textElement = document.getElementById('apptext');
//   var getContact = await client.data.get("ticket");
//   //get the converation.
//   var headers = {"Authorization": "Basic sZ4vbB1IUKkiZtlDAdz"};
//   var options = { headers: headers };
//   var url = "https://hdufsixcv.freshdesk.com/a/tickets/7?include=conversations";
//   const fetchPromise = await client.request.get(url, options);
//   fetchPromise.then (
//     response => {
//       console.log('reyyy',response)
//       return JSON.parse(resonse.response);
//     })
//     .then(conversations => {
//       main.innerHTML = attachment(conversations);

//     });

//     function attachment(conversations) {
//       const convo = conversations.map(conversation => `<li><input type='checkbox' value=${conversation.id}/><lable><a target='_blank'>${conversation.name}</a></label></li>`)
//       return `<ul>${convo}</ul>`
//     }

//   const ticketDetails = getContact.ticket.attachments
//   textElement.innerHTML =ticketDetails.map(each=> `<li><input type='checkbox' value=${each.id}/><lable><a target='_blank'>${each.name}</a></label></li> <br/> <a download href=${each.attachment_url.jpeg}> <button>Download</button></a>`)

//   //div.setAttribute('href', `${convo}${})
//    // console.log('vd',getContact)

// }
// catch(error) {
//   console.log(error);
// }
// }