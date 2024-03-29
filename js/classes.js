let classes = 0;


function get_number_class(value){
    if (value.length === 3){
        return value.slice(0,2)
    } if (value.length === 2) {
        return value.slice(0,1)
    } else {
        RangeError('Ошибка в кол-ве символов в классе', value);
    }
};

function get_letter_class(value){
    if (value.length === 3){
        return value.slice(2,3)
    } if (value.length === 2) {
        return value.slice(1,2)
    } else {
        RangeError('Ошибка в кол-ве символов в классе', value);
    }
};

/**
 * @name addInputClasses
 * @description create html element div.
 */
 function addInputClasses(class_name = '', count_selected = '') {
    let res = ++classes;
    let profile = document.getElementById('input-classes');
    let div = document.createElement('div');
    
    let class_number = '';
    let class_letter = '';
    if (class_name != '') {
        class_number = get_number_class(class_name);
        class_letter = get_letter_class(class_name);
    };

    let option_selected = '';
    if (count_selected === '5' || count_selected === '') {
        option_selected = '<option value="5" selected>5</option> \
                           <option value="6">6</option>'
    } else {
        option_selected = '<option value="5">5</option> \
                           <option value="6" selected>6</option>'
    };
    

    div.id = 'input-classes-' + res;
    div.classList.add('item');
    div.innerHTML = '<div class="input-classes"> \
                        <input type="text" name="class_number" class="classes-name-number" value="' + class_number +'" placeholder="5" pattern="[0-9]{1,2}" required> \
                        <input type="text" name="class_letter" class="classes-name-letter" value="' + class_letter +'" placeholder="А" pattern="[А-Яа-я]{1}" required> \
                        <div> \
                            <span class="description-text">кол-во уч. дней в неделю:</span> \
                            <select name="classes-study-day" class="choose-count" data-width="50px" required> \
                            ' + option_selected +'\
                            </select> \
                        </div> \
                    </div> \
                    <div class="counter" onclick="delInput(\'input-classes-\',' + res + ')"> \
                        <svg class="trash" viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"> \
                        <path d="M32 17H28.5L27.5 16H22.5L21.5 17H18V19H32V17ZM19 32C19 32.5304 19.2107 33.0391 19.5858 33.4142C19.9609 33.7893 20.4696 34 21 34H29C29.5304 34 30.0391 33.7893 30.4142 33.4142C30.7893 33.0391 31 32.5304 31 32V20H19V32Z" fill="#979797"/>\
                        </svg> \
                    </div> ';
    profile.appendChild(div);
    $('.choose-count').selectpicker('refresh');

    let scroll_to_bottom = document.getElementsByClassName('boxer')[2];
	scrollBottom(scroll_to_bottom);
  };


  /**
 * @name getClasses
 * @description create ste of classes which input user.
 * @returns {set} classes
 */
function getClasses() {
    let i = 0;
    let classes = new Set();
    while (i < 1000) {
        let doc = document.getElementById('input-classes-' + String(i)) ;
        if (doc) {
            classes.add(String(doc.getElementsByClassName('classes-name-number')[0].value) + doc.getElementsByClassName('classes-name-letter')[0].value);
        }
        i+=1;
    }
    return classes;
};

/**
 * @name checkSelectionClasses
 * @description update classes every 1 second
 * 
 * 
 */
function checkSelectionClasses() {
    let classes = getClasses();

    // remove
    for (let button of document.getElementsByClassName('class-btn')) {
        if (!classes.has(button.value)) {
            button.remove();
        };
    };
    // add
    let new_buttons = new Set();
    let update_buttons = document.getElementsByClassName('class-btn');
    for (let button of update_buttons){
        new_buttons.add(button.value);
    };

    // create
    for (let cls of classes) {
        if (!new_buttons.has(cls) && cls != undefined) {
            let button = document.createElement('a');
            button.innerHTML = cls;
            button.value = cls;
            button.onclick = visBox;
            button.classList.add('class-btn');
            button.classList.add('pas-btn');
            document.getElementById('avaliable-classes').appendChild(button);
        };
    };
    check_active_classes(); 
};

function remove_class() {
    for (let item of document.querySelectorAll("#avaliable-classes a")) {
        item.classList.remove("class-active");
    }
}

function check_active_classes() {
    for (let item of document.querySelectorAll("#avaliable-classes a")) {
        item.addEventListener('click', but => {
            remove_class();
            item.classList.add("class-active");
        });
    };
};