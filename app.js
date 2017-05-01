$(function(){
	let $textPlan = $('.js-text-area');
	let $savePlans = $('.js-save-plans');

	let tasks = [
	{
		text : 'Приготовить ризотто',
		done : true
	},
	{
		text: 'Посмотреть ТБВ',
		done: true
	},
	{
		text: 'Написать приложение todo',
		done: false
	}
	];

	function render() {
		let new_html = `<ul class='save-plans'>`
		for (let task of tasks) {
				new_html += `<li class="save-plans__item" data-id="${tasks.indexOf(task)}"><span ${task.done ? "class='task-done'" : ''}>${task.text}</span><input class="js-task-check" type='checkbox' ${task.done ? 'checked' : ''}>
				<button class="js-delete-task">Delete</button>
				</li>`;		
		}
		new_html += `</ul><button id="deleteCompleted">Delete completed</button>`;
		$('.js-save-plans').html(new_html);
	}

	$('#formBox').on('submit', function(e) {
		e.preventDefault();
		let $planValue = $textPlan.attr('value');
		tasks.unshift({text: $planValue, done: false});
		render();
	});

	$('.js-save-plans').on('change', '.js-task-check', function() {
		let id = $(this).parent().data('id');
		tasks[id].done = !tasks[id].done;
		render();
	});

	$('.js-save-plans').on('click', '.js-delete-task', function() {
		let id = $(this).parent().data('id');
		tasks.splice(id, 1);
		render();	
	});

	$('.js-save-plans').on('click', '#deleteCompleted', function() {
		console.log($('.js-task-check:checked').parent().text());
		$('.js-task-check:checked').each(function(){
			console.log($(this));
			let id = $(this).parent().data('id');
			tasks.splice(id, 1);
		})
		render();
	})
	render();
});
