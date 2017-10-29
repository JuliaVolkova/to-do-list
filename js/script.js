'use strict';

var module = (function () {

    var addButton = document.querySelector('.add');
    var taskInput = document.querySelector('.new-item');
    var deadlineDate = document.querySelector('.deadline');
    var page;
    var list = new List([]);

    /**
     * @param {String} text
     * @param {Date} deadline
     * @param {Boolean} done
     * @constructor
     */
    function Task(text, deadline, done) {
        this.text = text;
        this.deadline = deadline;
        this.done = done;
        this.template = document.querySelector('#task-template');

        /**
         * @return {Node} Отрисовывает эелемент на странице
         */
        Task.prototype.render = function () {
            var element = this.template.content.querySelector('.task-add').cloneNode(true);
            var removeButton = element.querySelector('.remove');
            var checkbox = element.querySelector('.done');
            removeButton.addEventListener('click', (function () { list.remove(this) }).bind(this));
            checkbox.addEventListener('click', (function () { this.done = true; }).bind(this) );
            element.querySelector('.task-text').textContent = this.text;
            element.querySelector('.date').textContent = this.deadline.toDateString();
            return element;
        };
    }

    /**
     * @param {Array} tasks
     * @constructor
     */
    function List(tasks) {
        this.tasks = tasks;
        this.template = document.querySelector('#list-template');

        /**
         * @return {Array} возвращает массив элементов с текстами заданий
         */
        List.prototype.add = function (item) {
            this.tasks.push(item);
            this.render();
        };

        /**
         * @param {Task} task
         * @return {Array} удаляет элемент
         */
        List.prototype.remove = function (task) {
            this.tasks.splice(this.tasks.indexOf(task), 1);
            this.render();
        };

        /**
         * @return {Node} позволяет редактировать текст
         */
        List.prototype.edit = function () {
            // TODO 20.10.17 implement
        };

        /**
         * @return {Array} возвращает массив элементов заданий, отфильтрованных по дате
         */
        List.prototype.filter = function () {

        };

        List.prototype.render = function () {
            var element = this.template.content.querySelector('.tasks').cloneNode(true);
            var fragment = document.createDocumentFragment();
            tasks.forEach(function (task, index) {
                fragment.appendChild(task.render(index))
            });
            element.appendChild(fragment);
            var oldChild = page.querySelector('.tasks');
            if (oldChild) {
                page.removeChild(oldChild);
            }
                page.appendChild(element);
        }
    }

    function addNewTask() {
        list.add(new Task(taskInput.value, new Date(deadlineDate.value), false));
    }

    return {
        /**
         * @param {HTMLElement} container
         */
        init: function (container) {
            addButton.addEventListener('click', addNewTask);
            page = container;
            list.render();
        }
    }
})();

module.init(document.querySelector('.container'));
