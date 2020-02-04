// 处理弹出的操作面板

// cell --> (click) --> popup
// popup --> (click) --> n --> (fill) --> cell
const Grid = require("./grid")
// 字体颜色
const numberClass = [
  "#FFFFFF",
  "#4876FF",
  "#458B00",
  "#CD6600",
  "#27408B",
  "#B22222",
  "#48D1CC",
  "#CD00CD",
  "#EEC900",
  "#000000"
]

class PopupNumbers {
  constructor($panel) {
    this._$panel = $panel.hide().removeClass("hidden")

    // 面板上的事件代理
    // 填入数字或mark的样式
    // 填入数字或样式后 面板应该消失
    this._$panel.on("click", "span", e => {
      const $cell = this._$targetCell

      const $span = $(e.target)

      if ($span.hasClass("mark1")) {
        // 如果点击的span为mark1
        // 首先查看单元格cell是否具有mark1样式
        // 如果有 则移除
        // 如果没有 则移除mark2并加上样式mark1
        if ($cell.hasClass("mark1")) {
          $cell.removeClass("mark1")
        } else {
          $cell.removeClass("mark2").addClass("mark1")
        }
      } else if ($span.hasClass("mark2")) {
        // 同理
        if ($cell.hasClass("mark2")) {
          $cell.removeClass("mark2")
        } else {
          $cell.removeClass("mark1").addClass("mark2")
        }
      } else if ($span.hasClass("empty")) {
        // 如果点的空白块
        $cell
          .text(0)
          .removeClass("mark1")
          .removeClass("mark2")
          .addClass("empty")
          .css({
            color: numberClass[0]
          })
      } else {
        // 填入数字
        // 移除empty类 并添加上面板上点击的数字
        $cell
          .removeClass("empty")
          .text($span.text())
          .css({
            color: numberClass[$span.text()]
          })
      }
      // 点击完之后需要关闭面板
      this._$panel.hide()
    })
  }

  popup($cell) {
    this._$targetCell = $cell
    const {
      left,
      top
    } = $cell.position()

    this._$panel
      .css({
        left: `${left}px`,
        top: `${top}px`
      })
      .show()
  }
}

module.exports = PopupNumbers