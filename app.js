$(function(){
	let $textPlan = $('.js-text-area');
	let $savePlans = $('.js-save-plans');

	let tasks = [
	{
		text : 'Приготовить ризотто',
		done : true,
		id: 0
	},
	{
		text: 'Посмотреть ТБВ',
		done: true,
		id: 1
	},
	{
		text: 'Написать приложение todo',
		done: false,
		id: 2
	}
	];

let index = tasks.length;

	function render() {
		let new_html = `<ul class='save-plans'>`
		for (let task of tasks) {
				new_html += `<li class="save-plans__item" data-id="${task.id}"><span ${task.done ? "class='task-done'" : ''}>${task.text}</span><input class="js-task-check" type='checkbox' ${task.done ? 'checked' : ''}>
				<button class="js-delete-task">Delete</button>
				</li>`;		
		}
		new_html += `</ul><button id="deleteCompleted">Delete completed</button>`;
		$('.js-save-plans').html(new_html);
	}

	$('#formBox').on('submit', function(e) {
		e.preventDefault();
		let $planValue = $textPlan.attr('value');
		tasks.unshift({text: $planValue, done: false, id: index++});
		localStorage.setItem(1, JSON.stringify({text: $planValue, done: false}));
		render();
		this.reset();
	});

	$('.js-save-plans').on('change', '.js-task-check', function() {
		let id = $(this).parent().data('id');
		console.log(id);
		tasks.forEach(function(task){
			if (id == task.id) {
					task.done = !task.done;
			} 
		})
		render();
	});

	$('.js-save-plans').on('click', '.js-delete-task', function() {
		let id = $(this).parent().data('id');
		tasks.forEach(function(task, i, tasks) {
			if (id == task.id) {
					tasks.splice(i, 1);
			} 
		})
		render();
	});

	$('.js-save-plans').on('click', '#deleteCompleted', function() {
		console.log($('.js-task-check:checked').parent().text());
		$('.js-task-check:checked').each(function() {
			let id = $(this).parent().data('id');
			console.log('delete id: ', id);
			tasks.forEach((task, i) => { console.log('index:', i, ' object:\n', task) });
			tasks.forEach(function(task, i, tasks) {
			if (id == task.id) {
					tasks.splice(i, 1);
					} 
			})
		})
		render();
	})
	render();
});
