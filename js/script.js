'use strict';

var addButton = document.querySelector('.add');
var taskInput = document.querySelector('.new-item');
var deadlineDate = document.querySelector('.deadline');
var taskList = document.querySelector('.tasks');
var removeButton = document.querySelector('.remove');


/**
 * @param {String} text
 * @param {String} deadline // Date??
 * @param {Boolean} done
 * @constructor
 */
function Task(text, deadline, done) {
    this.text = text;
    this.deadline = deadline;
    this.done = done;
    this.element = document.querySelector('#task-template').content.cloneNode(true);

    /**
     * @return {Node} Отрисовывает эелемент на странице
     */
    Task.prototype.render = function () {
        this.element.querySelector('.task-text').textContent = this.text;
        this.element.querySelector('.date').textContent = this.deadline;
        return this.element;
    };
}

/**
 *
 * @param {Array} tasks
 * @constructor
 */
function List (tasks) {
    this.tasks = tasks;

    /**
     * @return {Array} возвращает массив элементов с текстами заданий
     */
    List.prototype.add = function (item) {
        this.tasks.push(item);
    };

    /**
     * @return {Array} удаляет элемент
     */
    List.prototype.remove = function (item) {

        this.tasks.splice(this.tasks.indexOf(item), 1);
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
        // TODO 20.10.17 implement
    };
}

var list = new List([]);

function addNewTask () {

    var task = new Task(taskInput.value, deadlineDate.value, false);
    list.add(task);
    taskList.appendChild(task.render());
}

function removeTask () {

}

addButton.addEventListener('click', addNewTask);
//removeButton.addEventListener('click', removeTask);
