
directives: {
  setDivInput: {
    inserted(e) {
      // 干掉IE http之类地址自动加链接
      try {
        document.execCommand("AutoUrlDetect", false, false);
      } catch (e) {
        console.log(e);
      }
      e.addEventListener("paste", (e) => {
        e.preventDefault();
        var text = null;

        if (window.clipboardData && window.clipboardData.setData) {
          // IE
          text = window.clipboardData.getData("text");
        } else {
          text =
            (e.originalEvent || e).clipboardData.getData("text/plain") ||
            prompt("在这里输入文本");
        }
        if (document.body.createTextRange) {
          let textRange;
          if (document.selection) {
            textRange = document.selection.createRange();
          } else if (window.getSelection) {
            let sel = window.getSelection();
            var range = sel.getRangeAt(0);

            // 创建临时元素，使得TextRange可以移动到正确的位置
            var tempEl = document.createElement("span");
            tempEl.innerHTML = "&#FEFF;";
            range.deleteContents();
            range.insertNode(tempEl);
            textRange = document.body.createTextRange();
            textRange.moveToElementText(tempEl);
            tempEl.parentNode.removeChild(tempEl);
          }
          textRange.text = text;
          textRange.collapse(false);
          textRange.select();
        } else {
          // Chrome之类浏览器
          document.execCommand("insertText", false, text);
        }
      });
      // 去除Crtl+b/Ctrl+i/Ctrl+u等快捷键
      e.addEventListener("keydown", (e) => {
        // 9 tab键
        switch (e.keyCode) {
          case 9:
            document.execCommand("insertText", false, "    ");
            e.preventDefault();
            e.stopPropagation();
            break;
        }
        // e.metaKey for mac
        if (e.ctrlKey || e.metaKey) {
          switch (e.keyCode) {
            case 66: //ctrl+B or ctrl+b
            case 98:
            case 73: //ctrl+I or ctrl+i
            case 105:
            case 85: //ctrl+U or ctrl+u
            case 117: {
              e.preventDefault();
              break;
            }
          }
        }
      });
    },
  },
}