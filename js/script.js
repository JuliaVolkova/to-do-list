'use strict';

var module = (function () {

    var addButton = document.querySelector('.add');
    var taskInput = document.querySelector('.new-item');
    var deadlineDate = document.querySelector('.deadline');
    var popup = document.querySelector('.hidden');
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

            removeButton.addEventListener('click', (function () {
                list.remove(this);
            }).bind(this));

            checkbox.addEventListener('click', (function () {
                list.changeStatus(this);
                popup.classList.remove('hidden');
                var closeButton = document.querySelector('.close');
                closeButton.addEventListener('click', function () { popup.classList.add('hidden') });
            }).bind(this));

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
        this.currentFilter = function (task) {
            return !task.done;
        };

        this.filters = new Map();
        this.filters.set(document.querySelector('#today'), function (task) {
            return task.deadline.toDateString() === new Date().toDateString();
        });
        this.filters.set(document.querySelector('#tomorrow'), function (task) {
            var tomorrow = new Date(task.deadline.getFullYear(), task.deadline.getMonth(), task.deadline.getDate() + 1);
            console.log(tomorrow);
            return task.deadline.toDateString() === tomorrow.toDateString();
        });
        this.filters.set(document.querySelector('#next-week'), function (task) {
            return false;
        });
        this.filters.set(document.querySelector('#completed'), function (task) {
            return task.done === true;
        });

        document.querySelector('.go').addEventListener('click', function () {
            this.currentFilter = this.filters.get(document.querySelector('.filters input:checked'));
            this.render();
        }.bind(this));

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
         * @param {Task} task
         */
        List.prototype.changeStatus = function (task) {
            task.done = !task.done;
            this.render();
        };

        /**
         * @return {Node} позволяет редактировать текст
         */
        List.prototype.edit = function () {
            // TODO 20.10.17 implement
        };

        List.prototype.render = function () {
            var element = this.template.content.querySelector('.tasks').cloneNode(true);
            var fragment = document.createDocumentFragment();
            this.tasks
                .filter(this.currentFilter)
                .forEach(function (task) {
                    fragment.appendChild(task.render())
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
        taskInput.value = '';
        deadlineDate.value = '';
    }

    return {
        /**
         * @param {HTMLElement} container
         */
        init: function (container) {
            page = container;
            addButton.addEventListener('click', addNewTask);
            list.render();
        }
    }
})();

module.init(document.querySelector('.container'));
