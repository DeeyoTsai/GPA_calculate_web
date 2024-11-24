// let hero = document.querySelector(".hero");
// let animation = document.querySelector(".animation-wrapper");
// let slider = document.querySelector(".slider");

// const time_line = new TimelineMax();

// // para1:要控制的對象
// // para2:duration
// // para3:控制對象的起始狀態
// // para4:控制對象的動畫結束狀態
// // para5:設定進場時間
// time_line
//   .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
//   .fromTo(
//     hero,
//     1.2,
//     { width: "80%" },
//     { width: "100%", ease: Power2.easeInOut }
//   )
//   .fromTo(
//     slider,
//     1,
//     { x: "-100%" },
//     { x: "0%", ease: Power2.easeInOut },
//     "-=1.2"
//   )
//   .fromTo(animation, 0.3, { opacity: "1" }, { opacity: "0" });

// window.setTimeout(() => {
//   //動畫結束後，關閉 .animation-wrapper點擊事件，就是無法點選
//   animation.style.pointerEvents = "none";
// }, 2500);

// 讓整個網站的Enter key禁止使用
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// 防止form內部的button交出表單
let allButton = document.querySelectorAll("button");
// console.log(allButton);
allButton.forEach((button) => {
  //   console.log(e);
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// 選擇select option後，改變相對應顏色
let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    // console.log(e.target.value);
    setGPA();
    changeColor(e.target);
  });
});

// 改變credit後，更新GPA
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B-" ||
    target.value == "B+"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C-" ||
    target.value == "C+"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D" ||
    target.value == "D-" ||
    target.value == "D+"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "grey";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
    // target.style.color = "white";
  }
}

function convert(target) {
  switch (target) {
    case "A":
      return 4;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0.0;
  }
}

function setGPA() {
  let formlength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let grades = document.querySelectorAll("select");
  let credit_sum = 0;
  let sum = 0;
  // credit sum
  for (let i = 0; i < formlength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      credit_sum += credits[i].valueAsNumber;
    }
  }

  // each credit x grade
  for (let i = 0; i < formlength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convert(grades[i].value);
    }
  }
  // calculate GPA
  let result;

  if (credit_sum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / credit_sum).toFixed(2);
  }
  document.querySelector("#result-gpa").innerText = result;
}
