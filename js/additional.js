//Тут всякие штуки, шаблоны и кусочки, которые пока не пригодились, но могут пригодиться

var taskTemplate = templater('\
<p class="task">\
    <label for="done" class="visually-hidden">Task done</label>\
    <input type="checkbox" class="done" id="done" {{ checked }}>\
    <span class="task-text">{{ text }}</span>\
    <input class="visually-hidden">\
    <button type="button" class="edit">Edit</button>\
    <button type="button" class="remove">Remove</button>\
</p>\
');

addButton.addEventListener ('click', function () {
    console.log("add new task");
    document.body.innerHTML += taskTemplate({ text: "hello world", checked: "checked" });
});

function templater(html) {
    return function(data) {
        for (var x in data) {
            var re = '{{\\s?' + x + '\\s?}}';
            html = html.replace(new RegExp(re, 'ig'), data[x]);
        }
        return html;
    };
}