document.onreadystatechange = function () {
  if (document.readyState === "interactive") renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on("app.activated", onAppActivate);
    }
  }
};

const fdGetRequest = (url, options) => {
  return new Promise((resolve, reject) => {
    client.request.get(url, options).then(
      (data) => resolve(data),
      (err) => reject(err)
    );
  });
};

function displayAttachment(attachmentData) {
  console.log("jey", attachmentData);
  const textElement = document.getElementById("apptext");
  




  var current_page = 1;
  var records_per_page = 5;

  function prevPage() {
    if (current_page > 1) {
      current_page--;
      changePage(current_page);
    }
  }

  function nextPage() {
    if (current_page < numPages()) {
      current_page++;
      changePage(current_page);
    }
  }



  function changePage(page) {
    console.log("Change Page Called >>")
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    for (
      var i = (page - 1) * records_per_page;
      i < page * records_per_page;
      i++
    ) {

      console.log("i >>", i)

      listing_table.innerHTML +=`<li> 
          <input type='checkbox' value=${attachmentData[i].id}/>
           <lable>
              <a href="${attachmentData[i].attachment_url}" download="image" target='_blank'>${attachmentData[i].name}</a>
             </label>
         </li>`

      // listing_table.innerHTML += attachmentData[i].name + "<br>";
      //listing_table.innerHTML = "";
      console.log("her", attachmentData);
      // for (each of attachmentData) {


      //   textElement.innerHTML += `<li> 
      //     <input type='checkbox' value=${each.id}/>
      //       <lable>
      //         <a href="${each.attachment_url}" download="image" target='_blank'>${each.name}</a>
      //       </label>
      //   </li>`;
      // }


    }
    page_span.innerHTML = page;

    if (page == 1) {
      btn_prev.style.visibility = "hidden";
    } else {
      btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
      btn_next.style.visibility = "hidden";
    } else {
      btn_next.style.visibility = "visible";
    }
  }

  function numPages() {
    return Math.ceil(attachmentData.length / records_per_page);
  }

  console.log("Before Change Page Call>>")
  changePage(1);
  // prevPage();
  // nextPage();
}

function onAppActivate() {
  
  var getContact = client.data.get("ticket");
  getContact.then(showContact).catch(handleErr);

  async function showContact(payload) {
    console.log("rrr", payload);
    const ticketDetails = payload.ticket.attachments;

    // textElement.appendChild(document.createElement('h1').value='balu');

    const converData = await getEntireConversations();

    let attachmentData = [];

    converData.map((conv) => {
      if (conv && conv.attachments && conv.attachments.length > 0) {
        attachmentData.push(...conv.attachments);
      }
    });

    console.log("ATT DATA >> ", attachmentData);

    displayAttachment(attachmentData);

    console.log("AD", converData);
  }
}
function handleErr(err) {
  console.error(" Error Bro ", err);
}

const getEntireConversations = async function (pageNo = 1) {
  console.log("Page >> ", pageNo);
  const results = await getConversations(pageNo);
  console.log("Retreiving data from API for page :", results);

  if (results.length > 0) {
    return results.concat(await getEntireConversations(pageNo + 1));
  } else {
    return results;
  }
};

const getConversations = async (pageNo = 1) => {
  var headers = {
    Authorization: "Basic <%= encode(iparam.apiKey) %>",
    "Content-Type": "application/json",
  };
  var options = { headers: headers };
  //?include=conversations
  var url = `https://spritle2175.freshdesk.com/api/v2/tickets/3/conversations?page=${pageNo}&per_page=10`;

  const { response } = await fdGetRequest(url, options);

  const convData = JSON.parse(response);

  return convData;
};
