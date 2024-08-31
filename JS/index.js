// 刷新页面
function refreshPage() {
    location.reload();
}



// ========================================================= 右侧休闲区 ========================================================= //
// 获取随机动漫图片
document.getElementById('randomImg').addEventListener('click', function () {
    this.src = 'https://t.mwm.moe/mp' + '?' + new Date().getTime();
});

// 重新打开一个窗口跳转到随机小姐姐网页
function OpenNewPageGirlVideo() {
    window.open('https://udp.qqsuu.cn/ceshi/', '_blank');
}



// ========================================================= 中部子菜单 ========================================================= //
// 页面加载时默认选中第一个按钮
window.onload = function () {
    var firstButton = document.querySelector('.navbar-menu button:first-child');
    firstButton.classList.add('selected');
}

// 点击首页收回显示子菜单
function Side_to_Side_back(button) {
    // 隐藏除了首页的其他页面
    var SubmenuExit = document.getElementsByClassName('middle-submenu-box');
    SubmenuExit['bt-1'].style.display = 'none';
    SubmenuExit['bt-2'].style.display = 'none';
    SubmenuExit['bt-3'].style.display = 'none';
    SubmenuExit['bt-4'].style.display = 'none';
    SubmenuExit['bt-5'].style.display = 'none';

    //实现点击首页按钮的切换
    var buttons = document.querySelectorAll('.navbar-menu button');
    buttons.forEach(function (btn) {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');


    /* ↑ 隐藏子菜单box
    -------------------------------------------------------------------------
    显示桌面box ↓  */


    // 左侧待办事项样式
    var leftTOdoSection = document.querySelector('.left-TO-DO');
    var L_Style = leftTOdoSection.style;
    L_Style.left = '2%';
    L_Style.transition = " left 0.4s ease";

    // 右侧图片样式
    var rightFallowSection = document.querySelector('.right-fallow');
    var R_Style = rightFallowSection.style;
    R_Style.right = '2%';
    R_Style.transition = " right 0.4s ease";
}

/* ------------------------------------------- */
// 展示子菜单
function Side_to_Side(button, id) {
    // 左侧待办事项样式
    var leftTOdoSection = document.querySelector('.left-TO-DO');
    var L_Style = leftTOdoSection.style;
    L_Style.left = '-100%';
    L_Style.transition = " left 0.4s ease";

    // 右侧图片样式
    var rightFallowSection = document.querySelector('.right-fallow');
    var R_Style = rightFallowSection.style;
    R_Style.right = '-8%';
    R_Style.transition = " right 0.4s ease";


    /* ↑ 展开桌面box
    -------------------------------------------------------------------------
    显示子菜单box ↓  */

    var MenuSection = document.getElementsByClassName('middle-submenu-box');
    for (var i = 0; i < MenuSection.length; i++) {
        MenuSection[i].style.display = 'none';
        MenuSection[i].style.animation = 'zoom_1 1s';
    }
    document.getElementById(id).style.display = 'block';

    // 选中当前按钮
    var buttons = document.querySelectorAll('.navbar-menu button');
    buttons.forEach(function (btn) {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
}



// ========================================================= 左侧功能区 ========================================================= //
//添加待办事项
let todoList = document.getElementsByTagName('ol')[0];
let inputElement = document.getElementById('content');
let strikethroughStatus = JSON.parse(localStorage.getItem('strikethroughStatus')) || []; // 新增一个数组来保存每个待办事项的删除线状态
let todos = JSON.parse(localStorage.getItem('todos')) || [];  // todos数组保存待办项 


function addNew(content) {
    let item = document.createElement('li');
    item.innerText = content;
    addNewButton(item);
    todoList.appendChild(item);

    todos.push(content);
    strikethroughStatus.push(false);  // 初始时删除线状态为 false
    save();
}

function addNewButton(item) {
    let container = document.createElement('div');
    container.className = 'removebtnContainer';
    item.appendChild(container);
}

function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('strikethroughStatus', JSON.stringify(strikethroughStatus));  // 保存删除线状态
}

function reLoad() {
    todos.forEach((content, index) => {
        let item = document.createElement('li');
        item.innerText = content;
        if (strikethroughStatus[index]) {  // 根据状态添加删除线类
            item.classList.add('clicked');
        }
        addNewButton(item);
        todoList.appendChild(item);
    });
}

function reMove(item) {
    let parent = item.parentNode;
    let index = Array.from(todoList.children).indexOf(parent);
    parent.remove();
    todos.splice(index, 1);
    strikethroughStatus.splice(index, 1);  // 同步删除删除线状态
    save();
}

/* ↑ 函数声明
-------------------------------------------------------------------------
事件、执行 ↓                                                              */

reLoad(); //从本地载入

//键盘回车添加
inputElement.addEventListener('keyup', (event) => {
    if (event.keyCode == 13 && inputElement.value) {  //回车 keyCode === 13
        addNew(inputElement.value.trim());
        inputElement.value = '';
    }
})

//点击删除
todoList.addEventListener('click', (event) => {
    if (event.target.className == 'removebtnContainer') {
        reMove(event.target);
    } else if (event.target.tagName === 'LI') {
        let index = Array.from(todoList.children).indexOf(event.target);
        strikethroughStatus[index] = !strikethroughStatus[index];  // 切换删除线状态
        event.target.classList.toggle('clicked');
        save();
    }
}, false)

// 鼠标悬停自动获取焦点
inputElement.addEventListener('mouseover', function () {
    this.focus();
});

// 鼠标离开自动失去焦点
inputElement.addEventListener('mouseout', function () {
    this.blur();
});






