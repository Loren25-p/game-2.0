// async function sendRequest(url, method, data) {
//   url = `https://tg-api.tehnikum.school/tehnikum_course/minesweeper/${url}`;

//   const options = {
//     method: method,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   };

//   if (method === "POST") {
//     options.body = JSON.stringify(data);
//   } else if (method === "GET") {
//     url += "?" + new URLSearchParams(data);
//   }

//   let response = await fetch(url, options);
//   return await response.json();
// }

// let username;
// let balance;
// let points = 1000;
// let game_id;

// checkUser();

// let authorizationForm = document.getElementById("authorization");
// if (authorizationForm) {
//   authorizationForm.addEventListener("submit", authorization);
// }

// async function authorization(event) {
//   event.preventDefault();

//   const formData = new FormData(event.target);
//   username = formData.get("username");

//   let response = await sendRequest("user", "GET", { username });
//   if (response.error) {
//     let regResponse = await sendRequest("user", "POST", { username });
//     if (regResponse.error) {
//       alert(regResponse.message);
//     } else {
//       balance = regResponse.balance;
//       showUser();
//     }
//   } else {
//     balance = response.balance;
//     showUser();
//   }
// }

// function showUser() {
//   let popUpSection = document.querySelector("section");
//   popUpSection.style.display = "none";
//   let userInfo = document.querySelector("header span");
//   userInfo.innerHTML = `[${username}, ${balance}]`;

//   localStorage.setItem("username", username);
//   gameButton.setAttribute(
//     "data-game",
//     localStorage.getItem("game_id") ? "stop" : "start"
//   );
// }

// document.querySelector(".exit").addEventListener("click", exit);

// function exit() {
//   let popUpSection = document.querySelector("section");
//   popUpSection.style.display = "flex";
//   let userInfo = document.querySelector("header span");
//   userInfo.innerHTML = `[]`;

//   localStorage.removeItem("username");
// }

// async function checkUser() {
//   if (localStorage.getItem("username")) {
//     username = localStorage.getItem("username");
//     let response = await sendRequest("user", "GET", { username });
//     if (response.error) {
//       alert(response.message);
//     } else {
//       balance = response.balance;
//       showUser();
//     }
//   } else {
//     let popUpSection = document.querySelector("section");
//     popUpSection.style.display = "flex";
//   }
// }

// let pointBtns = document.getElementsByName("point");
// pointBtns.forEach((elem) => {
//   elem.addEventListener("input", setPoints);
// });

// function setPoints() {
//   let checkedBtn = document.querySelector("input:checked");
//   if (checkedBtn) {
//     points = +checkedBtn.value;
//   }
// }

// let gameButton = document.getElementById("gameButton");
// if (gameButton) {
//   gameButton.addEventListener("click", startOrStopGame);
// }

// function startOrStopGame() {
//   let option = gameButton.getAttribute("data-game");
//   if (option === "start" && points > 0) {
//     startGame();
//   } else if (option === "stop") {
//     stopGame();
//   }
// }

// async function startGame() {
//   let response = await sendRequest("new_game", "POST", { username, points });
//   if (response && response.error) {
//     alert(response.message);
//   } else {
//     console.log(response);
//     game_id = response.game_id;
//     gameButton.setAttribute("data-game", "stop");
//     gameButton.innerHTML = "Завершить игру";
//     activateArea();
//   }
// }

// function activateArea() {
//   let cells = document.querySelectorAll(".cell");
//   let rows = 8;
//   let columns = 10;

//   cells.forEach((cell, i) => {
//     setTimeout(() => {
//       let row = Math.floor(i / columns);
//       let column = i % columns;

//       cell.setAttribute("data-row", row);
//       cell.setAttribute("data-column", column);

//       cell.classList.add("active");
//       cell.addEventListener("contextmenu", setFlag);
//       cell.addEventListener("click", makeStep);
//     }, 15 * i);
//   });
// }

// function setFlag(event) {
//   event.preventDefault();
//   let cell = event.target;
//   cell.classList.toggle("flag");
// }

// // function makeStep(event) {
// //   let cell = event.target;
// //   let row = +cell.getAttribute("data-row");
// //   let column = +cell.getAttribute("data-column");

// //   let response = await sendRequest("stop_game", "POST", {row,column, game_id });
// //   if (response && response.error) {
// //     alert(response.message);
// //   } else {
// //     if(response.status== "Won") {

// //     } else if (response.status == "Failed") {
// //     } else if {(response.status == "Ok")

// //     }
// //   }

// //   console.log(`Step made on cell at row: ${row}, column: ${column}`);
// // }

// async function makeStep(event) {
//   let cell = event.target;
//   let row = +cell.getAttribute("data-row");
//   let column = +cell.getAttribute("data-column");

//   let response = await sendRequest("make_step", "POST", {
//     row,
//     column,
//     game_id,
//   });

//   if (response && response.error) {
//     alert(response.message);
//   } else {
//     if (response.status === "Won") {
//       alert("Поздравляем, вы выиграли!");
//       stopGame();
//     } else if (response.status === "Failed") {
//       alert("Вы проиграли. Попробуйте снова!");
//       stopGame();
//     } else if (response.status === "Ok") {
//       cell.classList.add("opened");
//     }
//   }

//   console.log(`Step made on cell at row: ${row}, column: ${column}`);
// }

// function updateArea(table) {
//   let cells = document.querySelectorAll(".cell");

//   let j = 0;
//   for (let row = 0; row < table.lenght; row++) {
//     for (let column = 0; column < table[row].lenght; column++) {
//       let value = table[row][column];
//       if (value === 0) {
//         cells[j].classList.remove("active");
//         cells[j].classList.remove("flag");
//       } else if (value >= 1) {
//         cells[j].classList.remove("active");
//         cells[j].classList.remove("flag");
//         cells[j].innerHTML = value;
//       } else if (value == "BOMB") {
//         cells[j].classList.remove("active");
//         cells[j].classList.remove("flag");
//         cells[j].classList.add("bomb");
//       }
//       j++
//     }
//   }
// }

// async function stopGame() {
//   let response = await sendRequest("stop_game", "POST", { username, game_id });
//   if (response && response.error) {
//     alert(response.message);
//   } else {
//     console.log(response);
//     balance = response.balance;
//     showUser();
//     game_id = response.game_id;
//     gameButton.setAttribute("data-game", "start");
//     gameButton.innerHTML = "Играть";
//     clearArea();
//   }
// }

// function clearArea() {
//   let area = document.querySelector(".area");
//   area.innerHTML = "";
//   for (let i = 0; i < 80; i++) {
//     area.innerHTML += `<div class="cell"></div>`;
//   }
// }

















async function sendRequest(url, method, data) {
    url = `https://tg-api.tehnikum.school/tehnikum_course/minesweeper/${url}`;
  
    const options = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  
    if (method === "POST") {
      options.body = JSON.stringify(data);
    } else if (method === "GET") {
      url += "?" + new URLSearchParams(data);
    }
  
    let response = await fetch(url, options);
    const responseText = await response.text(); 
    console.log('Response:', responseText); 
  
    try {
      return JSON.parse(responseText);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      throw new Error('Invalid JSON response');
    }
  }
  
  let username;
  let balance;
  let points = 1000;
  let game_id;
  
  checkUser();
  
  let authorizationForm = document.getElementById("authorization");
  if (authorizationForm) {
    authorizationForm.addEventListener("submit", authorization);
  }
  
  async function authorization(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    username = formData.get("username");
  
    let response = await sendRequest("user", "GET", { username });
    if (response.error) {
      let regResponse = await sendRequest("user", "POST", { username });
      if (regResponse.error) {
        alert(regResponse.message);
      } else {
        balance = regResponse.balance;
        showUser();
      }
    } else {
      balance = response.balance;
      showUser();
    }
  }
  
  function showUser() {
    let popUpSection = document.querySelector("section");
    popUpSection.style.display = "none";
    let userInfo = document.querySelector("header span");
    userInfo.innerHTML = `[${username}, ${balance}]`;
  
    localStorage.setItem("username", username);
    gameButton.setAttribute(
      "data-game",
      localStorage.getItem("game_id") ? "stop" : "start"
    );
  }
  
  document.querySelector(".exit").addEventListener("click", exit);
  
  function exit() {
    let popUpSection = document.querySelector("section");
    popUpSection.style.display = "flex";
    let userInfo = document.querySelector("header span");
    userInfo.innerHTML = `[]`;
  
    localStorage.removeItem("username");
  }
  
  async function checkUser() {
    if (localStorage.getItem("username")) {
      username = localStorage.getItem("username");
      let response = await sendRequest("user", "GET", { username });
      if (response.error) {
        alert(response.message);
      } else {
        balance = response.balance;
        showUser();
      }
    } else {
      let popUpSection = document.querySelector("section");
      popUpSection.style.display = "flex";
    }
  }
  
  let pointBtns = document.getElementsByName("point");
  pointBtns.forEach((elem) => {
    elem.addEventListener("input", setPoints);
  });
  
  function setPoints() {
    let checkedBtn = document.querySelector("input:checked");
    if (checkedBtn) {
      points = +checkedBtn.value;
    }
  }
  
  let gameButton = document.getElementById("gameButton");
  if (gameButton) {
    gameButton.addEventListener("click", startOrStopGame);
  }
  
  function startOrStopGame() {
    let option = gameButton.getAttribute("data-game");
    if (option === "start" && points > 0) {
      startGame();
    } else if (option === "stop") {
      stopGame();
    }
  }
  
  async function startGame() {
    let response = await sendRequest("new_game", "POST", { username, points });
    if (response && response.error) {
      alert(response.message);
    } else {
      console.log(response);
      game_id = response.game_id;
      gameButton.setAttribute("data-game", "stop");
      gameButton.innerHTML = "Завершить игру";
      activateArea();
    }
  }
  
  function activateArea() {
    let cells = document.querySelectorAll(".cell");
    let rows = 8;
    let columns = 10;
  
    cells.forEach((cell, i) => {
      setTimeout(() => {
        let row = Math.floor(i / columns);
        let column = i % columns;
  
        cell.setAttribute("data-row", row);
        cell.setAttribute("data-column", column);
  
        cell.classList.add("active");
        cell.addEventListener("contextmenu", setFlag);
        cell.addEventListener("click", makeStep);
      }, 15 * i);
    });
  }
  
  function setFlag() {
    event.preventDefault();
    let cell = event.target;
    cell.classList.toggle("flag");
  }
  
  async function makeStep() {
    let cell = event.target;
    let row = +cell.getAttribute("data-row");
    let column = +cell.getAttribute("data-column");
  
    let response = await sendRequest("game_step", "POST", {
      row,
      column,
      game_id,
    });
  
    if (response && response.error) {
      alert(response.message);
    } else {
      if (response.status === "Won") {
        alert("Поздравляем, вы выиграли!");
        updateArea(response.table)
    


      } else if (response.status === "Failed") {
        showUser()
        alert("Вы проиграли. Попробуйте снова!");
        clearArea()
        gameButton.setAttribute("data-game", "start")
        gameButton.innerHTML = "Играть"
        updateArea(response.table)


      } else if (response.status === "Ok") {
        updateArea(response.table)

      }
    }
  
    console.log(`Step made on cell at row: ${row}, column: ${column}`);
  }
  
  function updateArea(table) {
    let cells = document.querySelectorAll(".cell");
  
    let j = 0;
    for (let row = 0; row < table.length; row++) {
      for (let column = 0; column < table[row].length; column++) {
        let value = table[row][column];
        if (value === 0) {
          cells[j].classList.remove("active");
          cells[j].classList.remove("flag");
        } else if (value >= 1) {
          cells[j].classList.remove("active");
          cells[j].classList.remove("flag");
          cells[j].innerHTML = value;
        } else if (value === "BOMB") {
          cells[j].classList.remove("active");
          cells[j].classList.remove("flag");
          cells[j].classList.add("bomb");
        }
        j++;
      }
    }
  }
  
  async function stopGame() {
    let response = await sendRequest("stop_game", "POST", { username, game_id });
    if (response && response.error) {
      alert(response.message);
    } else {
      console.log(response);
      balance = response.balance;
      showUser();
      game_id = response.game_id;
      gameButton.setAttribute("data-game", "start");
      gameButton.innerHTML = "Играть";
      clearArea();
    }
  }
  
  function clearArea() {
    let area = document.querySelector(".area");
    area.innerHTML = "";
    for (let i = 0; i < 80; i++) {
      area.innerHTML += `<div class="cell"></div>`;
    }
  }




  