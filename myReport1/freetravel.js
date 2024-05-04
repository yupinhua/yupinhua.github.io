// 可調整參數
// 輪播內容物的顯示數量
const contentToShow = 2;
// 輪播切換時的速度，單位為ms
const moveSpeed = 500;

// 選取會使用的element
const carousel = document.querySelector(".carousel");
const container = document.querySelector(".container");
const allContent = document.querySelectorAll(".content");
const content = document.querySelector(".content");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const contentComputeStyle = getComputedStyle(content);

// 取得輪播內容物個數
const contentAmount = document.querySelectorAll(".content").length;

let distanceBetweenContent;

// 輪播容器之位置
let position = 0;

// 全域變數，管理輪播是否可以切換
let disableMove;

// 設定輪播所需的style，也可以在css中直接新增
carousel.style.overflow = "hidden";
carousel.style.position = "relative";
container.style.display = "flex";
container.style.position = "absolute";

// 設定輪播切換的動畫時間
container.style.transition = `transform ${moveSpeed}ms`;

const setContentWidth = function () {
  const carouselWidth = carousel.offsetWidth;

  // 可藉由給予輪播內容物margin-right屬性來設定內容物間的間隔
  const gap = parseInt(contentComputeStyle["margin-right"]);

  // 基於內容物的顯示數量，計算各內容物所需的大小
  const contentWidth =
    (carouselWidth - gap * Math.ceil(contentToShow - 1)) / contentToShow;

  allContent.forEach((el) => (el.style.width = `${contentWidth}px`));

  // 設定完內容物寬度後
  // 設定內容物間x軸之差，此為容器移動1單位之距離
  distanceBetweenContent =
    content.nextElementSibling.offsetLeft - content.offsetLeft;
};
const setContentHeight = function () {
  // 基於內容物的高度來設定容器高度
  carousel.style.height = contentComputeStyle.height;
};

const move = function (step) {
  // 由於不斷切換輪播時會產生動畫不平均的現象，因此設定在動畫完成後，才可以繼續切換輪播
  if (disableMove) return;
  // 避免超出範圍的guard clauses
  // contentAmount - contentToShow : 可允許可視範圍的最大值
  if (-(position - step) > contentAmount - contentToShow || position - step > 0)
    return;

  // 更新位置
  position -= step;

  // 移動
  container.style.transform = `translateX(${
    distanceBetweenContent * position
  }px`;
};

// 動畫開始時，禁止移動，直到動畫結束
container.addEventListener("transitionstart", () => {
  disableMove = true;
});
container.addEventListener("transitionend", () => {
  disableMove = false;
});

prevBtn.addEventListener("click", function () {
  move(-1);
});
nextBtn.addEventListener("click", function () {
  move(1);
});

setContentWidth();
setContentHeight();