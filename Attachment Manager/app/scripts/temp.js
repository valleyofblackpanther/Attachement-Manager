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
  
  
  function displayAttachment(attachmentData){
  
  
  
  
  }
  
  
  function onAppActivate() {
    var textElement = document.getElementById("apptext");
    var getContact = client.data.get("ticket");
    getContact.then(showContact).catch(handleErr);
  
    async function showContact(payload) {
      console.log("rrr", payload);
      const ticketDetails = payload.ticket.attachments;
  
      // textElement.appendChild(document.createElement('h1').value='balu');
      const getConversations = async (pageNo = 1) => {
        var headers = {
          Authorization: "Basic <%= encode(iparam.apiKey) %>",
          "Content-Type": "application/json",
        };
        var options = { headers: headers };
        //?include=conversations
        var url = `https://hdufsixcv.freshdesk.com/api/v2/tickets/7/conversations?page=${pageNo}&per_page=30`;
  
        const { response } = await fdGetRequest(url, options);
  
        const convData = JSON.parse(response);
  
        return convData;
  
        // client.request.get(url, options).then(
        //   function (data) {
  
        //    console.log("Data", data)
  
        //      let conversationDate = JSON.parse(data.response);
  
        //      return conversationDate
  
        //     // console.log("URI", conversationDate);
        //     // //  ticketDetails.extend(conversationDate.attachments)
        //     // for (each of conversationDate) {
        //     //   for (attach of each.attachments) {
        //     //     console.log('devarakonda',attach)
        //     //     ticketDetails.push(each);
        //     //   }
  
        //     // }
        //     // console.log("new", ticketDetails);
        //     // textElement.innerHTML = ticketDetails.map(
        //     //   (each) =>
        //     //     `<li>
        //     //      <input type='checkbox' value=${each.id}/>
        //     //        <lable>
        //     //          <a href="${each.attachment_url}" download="image" target='_blank'>${each.name}</a>
        //     //        </label>
        //     //    </li>`
        //     // );
  
        //     // textElement.innerHTML += "<button>Download</button>";
        //     // console.log("attachments", ticketDetails);
        //   },
        //   function (error) {
        //     console.log(error);
        //   }
        // );
      };
      //getConversations();
  
      let data = [];
      const getEntireConversations = async function (pageNo = 1) {
        console.log("Page >> ", pageNo);
        const results = await getConversations(pageNo);
        console.log("Retreiving data from API for page :", results);
  
        // console.log("data", data);
  
            if (results.length > 0) {
        return results.concat(await getEntireConversations(pageNo + 1));
      } else {
        return results;
      }
  
        // for (each of results) {
        //   for (attach of each.attachments) {
        //     data.push(each);
        //   }
        // }
  
        // displayAttachment(data)
  
        // textElement.innerHTML = "";
        // for (each1 of data) {
        //   for (each2 of each1.attachments) {
        //     textElement.innerHTML += `<li> 
        //   <input type='checkbox' value=${each2.id}/>
        //     <lable>
        //       <a href="${each2.attachment_url}" download="image" target='_blank'>${each2.name}</a>
        //     </label>
        // </li>`;
        //   }
        // }
  
        // const ulTag = document.querySelector("ul");
        // let totalPages = 20;
  
        // function element(totalPages, title) {
        //   const ulEl = document.getElementById("ter");
        //   let liTag = "";
        //   let activeLi;
        //   let beforePages = title - 1;
        //   let afterPages = title + 1;
  
        //   if (title > 1) {
        //     liTag += `<li class="btn prev" onclick="element(totalPages, ${
        //       title - 1
        //     })"><span><i class = "fas fa-angle-left"></i> Prev</span></li>`;
        //   }
        //   if (title > 2) {
        //     liTag += `<li class="numb" onclick="element(totalPages, 1)"><span>1</span></li>`;
        //     if (title > 3) {
        //       liTag += `<li class="dots"><span>...</span></li>`;
        //     }
        //   }
  
        //   if (title == totalPages) {
        //     beforePages = beforePages - 2;
        //   } else if (title == totalPages - 1) {
        //     beforePages = beforePages - 1;
        //   }
  
        //   if (title == 1) {
        //     afterPages = afterPages + 2;
        //   } else if (title == 2) {
        //     afterPages = afterPages + 1;
        //   }
  
        //   for (
        //     let pageLength = beforePages;
        //     pageLength < afterPages;
        //     pageLength++
        //   ) {
        //     if (pageLength > totalPages) {
        //       continue;
        //     }
  
        //     if (pageLength == 0) {
        //       pageLength = pageLength + 1;
        //     }
  
        //     if (title == pageLength) {
        //       activeLi = "active";
        //     } else {
        //       activeLi = "";
        //     }
        //     liTag += `<li class="numb ${activeLi}" onclick="element(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
        //   }
  
        //   if (title < totalPages - 1) {
        //     if (title < totalPages - 2) {
        //       liTag += `<li class="dots"><span>...</span></li>`;
        //     }
        //     liTag += `<li class="numb" onclick="element(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
        //   }
  
        //   if (title < totalPages) {
        //     liTag += `<li class="btn next"><span>Next <i class = "fas fa-angle-right"></i></span></li>`;
        //   }
        //   ulTag.innerHTML = liTag;
        //   ulEl.appendChild(liTag);
        // }
        // element(totalPages, 5);
      };
  
      client.interface
        .trigger("show", { id: "attachments" })
        .then(function (data) {
          for (each of data) {
            for (attach of each.attachments) {
              data.push(each);
            }
          }
        })
        .catch(function (error) {
          console.log("Again Error Bro", error);
        });
  
      client.interface
        .trigger("hide", { id: "attachmentsDelete" })
        .then(function (data) {
          
        })
        .catch(function (error) {
        
        });
  
      //   function load() {
      //     makeList();
      //     numberOfPages = getNumberOfPages();
      // }
  
      //   function getNumberOfPages() {
      //     return Math.ceil(data.length / numberPerPage);
      //   }
  
      //   document.getElementById("first").addEventListener("click", function () {
      //     console.log("BEFORE", currentPage)
      //     currentPage += 1;
      //     console.log("AFTER", currentPage)
      //     loadList();
      //   })
  
      //   document.getElementById("second").addEventListener("click", function () {
      //     console.log("BEFORE", currentPage)
      //     currentPage -= 1;
      //     console.log("AFTER", currentPage)
      //     loadList();
      //   })
  
      //   document.getElementById("previous").addEventListener("click", function () {
      //     console.log("BEFORE", currentPage)
      //     currentPage = 1;
      //     console.log("AFTER", currentPage)
      //     loadList();
      //   })
  
      //   document.getElementById("last").addEventListener("click", function () {
      //     console.log("BEFORE", currentPage)
      //     currentPage = numberOfPages;
      //     console.log("AFTER", currentPage)
      //     loadList();
      //   })
  
      //   function loadList() {
      //     let begin = ((currentPage - 1) * numberPerPage);
      //     let end = begin + numberPerPage;
  
      //     pageList = data.slice(begin, end);
      //     console.log(pageList)
      //     drawList();
      //     check();
      //   }
  
      //   function drawList() {
      //     document.getElementById("list").innerHTML = "";
      //     for (r = 0; r < pageList.length; r++) {
      //       document.getElementsById("list").innerHTML += pageList[r] + "<br/>";
      //     }
      //   }
  
      //   function check() {
      //     document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
      //     document.getElementById("previous").disabled = currentPage == 1 ? true : false;
      //     document.getElementById("first").disabled = currentPage == 1 ? true : false;
      //     document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
      //   }
  
      //   function load() {
      //     makeList();
      //     loadList();
      // }
  
      // window.onload = load;
  
      //     var page = 1;
      //     var per_page = 30;
      //     function totNumPages()
      //     {
      //         return Math.ceil(data.length / per_page);
      //     }
  
      //     function prevPage()
      //     {
      //         if (pager > 1) {
      //             pager--;
      //             change(pager);
      //         }
      //     }
      //     function nextPage()
      //     {
      //         if (pager < totNumPages()) {
      //             pager++;
      //             change(pager);
      //         }
      //     }
      //     function change(pager)
      //     {
      //         var btn_next = document.getElementById("btn_next");
      //         var btn_prev = document.getElementById("btn_prev");
      //         var listing_table = document.getElementById("TableList");
      //         var page_span = document.getElementById("pager");
      //         if (pager < 1) page = 1;
      //         if (pager > totNumPages()) pager = totNumPages();
      //         listing_table.innerHTML = "";
      //         for (var i = (pager-1) * per_page; i < (pager * per_page); i++) {
      //             listing_table.innerHTML += data[i].number + "<br>";
      //         }
      //         page_span.innerHTML = page;
      //         if (pager == 1) {
      //             btn_prev.style.visibility = "hidden";
      //         } else {
      //             btn_prev.style.visibility = "visible";
      //         }
      //         if (pager == totNumPages()) {
      //             btn_next.style.visibility = "hidden";
      //         } else {
      //             btn_next.style.visibility = "visible";
      //         }
      //     }
      //     window.onload = function() {
      //         change(1);
      //     };
  
      // if (results.length > 0) {
      //   return results.concat(await getEntireConversations(pageNo + 1));
      // } else {
      //   return results;
      // }
      //   var state = {
      //     'querySet': data,
  
      //     'page': 1,
      //     'rows': 5,
      //     'window': 5,
      // }
  
      // buildTable()
  
      // function pagination(querySet, page, rows) {
  
      //     var trimStart = (page - 1) * rows
      //     var trimEnd = trimStart + rows
  
      //     var trimmedData = querySet.slice(trimStart, trimEnd)
  
      //     var pages = Math.round(querySet.length / rows);
  
      //     return {
      //         'querySet': trimmedData,
      //         'pages': pages,
      //     }
      // }
  
      // function pageButtons(pages) {
      //     var wrapper = document.getElementById('pagination-wrapper')
  
      //     wrapper.innerHTML = ``
      //   console.log('Pages:', pages)
  
      //     var maxLeft = (state.page - Math.floor(state.window / 2))
      //     var maxRight = (state.page + Math.floor(state.window / 2))
  
      //     if (maxLeft < 1) {
      //         maxLeft = 1
      //         maxRight = state.window
      //     }
  
      //     if (maxRight > pages) {
      //         maxLeft = pages - (state.window - 1)
  
      //         if (maxLeft < 1){
      //           maxLeft = 1
      //         }
      //         maxRight = pages
      //     }
  
      //     for (var page = maxLeft; page <= maxRight; page++) {
      //       wrapper.innerHTML += `<button value=${page} >${page}</button>`
      //     }
  
      //     if (state.page != 1) {
      //         wrapper.innerHTML = `<button value=${1} >&#171; First</button>` + wrapper.innerHTML
      //     }
  
      //     if (state.page != pages) {
      //         wrapper.innerHTML += `<button value=${pages} >Last &#187;</button>`
      //     }
  
      //     $('.page').on('click', function() {
      //         $('#table-body').empty()
  
      //         state.page = Number($(this).val())
  
      //         buildTable()
      //     })
  
      // }
  
      // function buildTable() {
      //     var table = $('#table-body')
  
      //     var data = pagination(state.querySet, state.page, state.rows)
      //     var myList = data.querySet
      //     console.log('dfghj',myList)
      //        var i = 1;
      //     for ( i in myList) {
  
      //         var row = `<tr>
      //                   <td>${myList[i].id}</td>
      //                   <td>${myList[i].name</td>
      //                   <td>${myList[i].last_name}</td>
      //                   </tr>`
  
      //         table.append(row)
      //     }
  
      //     pageButtons(data.pages)
      // }
  
      // previousPage();
      // nextPage();
      // firstPage();
      // lastPage();
      const converData = await getEntireConversations();
    }
  }
  function handleErr(err) {
    console.error(" Error Bro ", err);
  }
  