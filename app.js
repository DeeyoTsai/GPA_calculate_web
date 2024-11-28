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

// plus-btn add new form
let allInputs = document.querySelector(".all-inputs");
let add_new_form = document.querySelector(".plus-btn");
// plus-btn新增點擊事件
add_new_form.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");
  //加入5項inputs元素
  //creat class-type element and set attribute
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("placeholder", "class category");
  newInput1.classList.add("class-type");
  newInput1.setAttribute("list", "opt");
  //create class-number and set attribute
  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.classList.add("class-number");
  //create credits input and set attribute
  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.classList.add("class-credit");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");

  newInput3.addEventListener("change", () => {
    setGPA();
  });

  //create select options and it's attribute
  let newSelect = document.createElement("select");
  newSelect.setAttribute("name", "select");
  newSelect.setAttribute("class", "select");
  let opt_blank = document.createElement("option");
  opt_blank.setAttribute("value", "");
  opt_blank.text = "";
  let opt_A = document.createElement("option");
  opt_A.setAttribute("value", "A");
  opt_A.text = "A";
  let opt_Aminus = document.createElement("option");
  opt_Aminus.setAttribute("value", "A-");
  opt_Aminus.text = "A-";
  let opt_Bplus = document.createElement("option");
  opt_Bplus.setAttribute("value", "B+");
  opt_Bplus.text = "B+";
  let opt_B = document.createElement("option");
  opt_B.setAttribute("value", "B");
  opt_B.text = "B";
  let opt_Bminus = document.createElement("option");
  opt_Bminus.setAttribute("value", "B-");
  opt_Bminus.text = "B-";
  let opt_Cplus = document.createElement("option");
  opt_Cplus.setAttribute("value", "C+");
  opt_Cplus.text = "C+";
  let opt_C = document.createElement("option");
  opt_C.setAttribute("value", "C");
  opt_C.text = "C";
  let opt_Cminus = document.createElement("option");
  opt_Cminus.setAttribute("value", "C-");
  opt_Cminus.text = "C-";
  let opt_Dplus = document.createElement("option");
  opt_Dplus.setAttribute("value", "D+");
  opt_Dplus.text = "D+";
  let opt_D = document.createElement("option");
  opt_D.setAttribute("value", "D");
  opt_D.text = "D";
  let opt_Dminus = document.createElement("option");
  opt_Dminus.setAttribute("value", "D-");
  opt_Dminus.text = "D-";
  let opt_F = document.createElement("option");
  opt_F.setAttribute("value", "F");
  opt_F.text = "F";

  newSelect.appendChild(opt_blank);
  newSelect.appendChild(opt_A);
  newSelect.appendChild(opt_Aminus);
  newSelect.appendChild(opt_Bplus);
  newSelect.appendChild(opt_B);
  newSelect.appendChild(opt_Bminus);
  newSelect.appendChild(opt_Cplus);
  newSelect.appendChild(opt_Dplus);
  newSelect.appendChild(opt_D);
  newSelect.appendChild(opt_Dminus);
  newSelect.appendChild(opt_F);

  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  //create trash button
  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);

  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
    // e.target.parentElement.parentElement
  });

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);
  newForm.appendChild(newDiv);
  allInputs.appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

// 為原本預設的form也新增trash btn功能
let all_trash = document.querySelectorAll(".trash-button");
all_trash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove");
  });
});

all_trash.forEach((trash) => {
  let form = trash.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
  });
});

// 排序演算法(Merge sort)
let descend_btn = document.querySelector(".sort-descending");
let ascend_btn = document.querySelector(".sort-ascending");

descend_btn.addEventListener("click", () => {
  handleSort("descending");
});

ascend_btn.addEventListener("click", () => {
  handleSort("ascending");
});

function handleSort(direction) {
  let grades = document.querySelectorAll("div.grader");
  let objArr = [];
  // 取得form value
  grades.forEach((grade) => {
    // console.log(grade.children[0]);
    let class_category = grade.children[0].value;
    let class_number = grade.children[1].value;
    let class_credits = grade.children[2].value;
    let class_grade = grade.children[3].value;
    // form只要有填值，就將資料填加入objArr
    if (
      !(
        class_category == "" &&
        class_number == "" &&
        class_credits == "" &&
        class_grade == ""
      )
    ) {
      let class_obj = {
        class_category,
        class_number,
        class_credits,
        class_grade,
      };
      objArr.push(class_obj);
    }
  });

  // covert class_grade covert to integer
  if (objArr.length > 0) {
    objArr.forEach((obj) => {
      obj.class_grade_number = convert(obj.class_grade);
    });
  }
  // console.log(objArr);

  objArr = mergeSort(objArr);
  if (direction == "descending") {
    objArr = objArr.reverse();
  }
  console.log(objArr);
  // 根據objArr內容更新網頁
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";

  for (let i = 0; i < objArr.length; i++) {
    allInputs.innerHTML += `<form>
      <div class="grader">
        <input
          type="text"
          placeholder="class category"
          class="class-type"
          list="opt"
          value=${objArr[i].class_category}
        /><!-- 
        --><input 
          type="text" 
          placeholder="class number" 
          class="class-number" 
          value=${objArr[i].class_number}
        /><!-- 
        --><input 
          type="number" 
          placeholder="credits" 
          min="0" 
          max="6" 
          class="class-credit" 
          value=${objArr[i].class_credits}
        /><!-- 
        --><select name="select" class="select">
          <option value=""></option>
          <option value="A">A</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="B-">B-</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="C-">C-</option>
          <option value="D+">D+</option>
          <option value="D">D</option>
          <option value="D-">D-</option>
          <option value="F">F</option>
        </select><!-- 
        --><button class="trash-button">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </form>`;
  }

  //select選項另外處理
  // 1.先進行select value賦值
  grades = document.querySelectorAll(".grader");
  grades.forEach((grade, index) => {
    grade.children[3].value = objArr[index].class_grade;
  });
  // 2.select change時變更background color與跟新GPA
  let allSelects = document.querySelectorAll(".select");
  for (let i = 0; i < allSelects.length; i++) {
    // 變更排序後更新顏色
    changeColor(allSelects[i]);
    allSelects[i].addEventListener("change", (e) => {
      // 為重新添加的form內容加入事件處理
      setGPA();
      changeColor(e.target);
    });
  }

  // 重新排序後項目，更新credit後計算GPA
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  // 重新排序後項目，更新trash tag event
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}

// 拆分後的兩陣列，倆倆進行合併
function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }
  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }
  return result;
}
// 將陣列拆分成單元素陣列後，進行merge()
// arr = [1, 3, 6 , 8] => [1] , [3] , [6], [8]
function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
