/*
Zachery Hernandez
ASD 1207
Project 4
7/26/2012
Body Health & Fitness
https://github.com/AlucardFair/ASD/Project_4
*/
// jQM Form Handler //

$('#home').on('pageinit', function(){

	// Load JSON Data //
	$('#jButton').on("click", function(){
	console.log('#jButton');
		$('#dataView').empty();
		$.ajax({
			url: 'data.json',
			type: 'GET',
			dataType: 'json',
			success: function(response){
			console.log(response);
				for (var i=0, j=response.workouts.length; i<j; i++){
					var rw = response.workouts[i];
					$(''+
						'<div class="workoutData">'+
							'<h2>'+ rw.workout +'</h2>'+
							'<p>'+ rw.training +'</p>'+
							'<p>'+ rw.wname +'</p>'+
							'<p>'+ rw.favorite +'</p>'+
							'<p>'+ rw.howlong +'</p>'+
							'<p>'+ rw.timeofday +'</p>'+
							'<p>'+ rw.completiondate +'</p>'+
							'<p>'+ rw.comments +'</p>'+
						'</div>'
					).appendTo('#dataView');
				};
			},
			error: function(error){
				console.log(error);
			} 
		});
	});

	// Load XML Data //
	$('#xButton').on("click", function(){
	console.log('#xButton');
		$('#dataView').empty();
		$.ajax({
			url: 'data.xml',
			type: 'GET',
			dataType: 'xml',
			success: function(xml){
			console.log(xml);
				$(xml).find('workouts').each(function(){
					var workout = $(this).find('workout').text();
					var training = $(this).find('training').text();
					var wname = $(this).find('wname').text();
					var favorite = $(this).find('favorite').text();
					var howlong = $(this).find('howlong').text();
					var timeofday = $(this).find('timeofday').text();
					var completiondate = $(this).find('completiondate').text();
					var comments = $(this).find('comments').text();
					$(''+
						'<div class="workoutData">'+
							'<h2>'+ workout +'</h2>'+
							'<p>'+ training +'</p>'+
							'<p>'+ wname +'</p>'+
							'<p>'+ favorite +'</p>'+
							'<p>'+ howlong +'</p>'+
							'<p>'+ timeofday +'</p>'+
							'<p>'+ completiondate +'</p>'+
							'<p>'+ comments +'</p>'+
						'</div>'
					).appendTo('#dataView');
				});
			},
			error: function(error){
				console.log(error);
			}
		});
	});

	// Load CSV Data //
	$('#cButton').on("click", function(){
	console.log('#cButton');
		$('#dataView').empty();
		$.ajax({
			url: 'data.csv',
			type: 'GET',
			dataType: 'text',
			success: function(text){
			console.log(text);
				var lines = text.split("\n");
				console.log(lines);
				for (var lineNum = 1; lineNum < lines.length; lineNum++) {
					var row = lines[lineNum].split(",");
					var columns = text.split(",");
					console.log(columns);
					$(''+
							'<div class="workoutData">'+
								'<h2>'+ columns[0] + row[0] +'</h2>'+
								'<p>'+ columns[1] + row[1] +'</p>'+
								'<p>'+ columns[2] + row[2] +'</p>'+
								'<p>'+ columns[3] + row[3] +'</p>'+
								'<p>'+ columns[4] + row[4] +'</p>'+
								'<p>'+ columns[5] + row[5] +'</p>'+
								'<p>'+ columns[6] + row[6] +'</p>'+
								'<p>'+ columns[7] + row[7] +'</p>'+
							'</div>'
						).appendTo('#dataView');
				}
			},
			error: function(error){
				console.log(error);
			} 
		});
	});
	
		// Load Couch Data //
	$('#couchButton').on("click", function(){
	console.log('#couchButton');
		$('#dataView').empty();
		$.ajax({
			url: '_view/workouts',
			type: 'GET',
			dataType: 'json',
			success: function(data){
			console.log(data);
				$.each(data.rows, function(index, workouts) {
					var workout = workouts.value.workout;
					var training = workouts.value.training;
					var wname = workouts.value.wname;
					var favorite = workouts.value.favorite;
					var howlong = workouts.value.howlong;
					var timeofday = workouts.value.timeofday;
					var completiondate = workouts.value.completiondate;
					var comments = workouts.value.comments;
					$(''+
						'<div class="workoutData">'+
							'<h2>'+ workout +'</h2>'+
							'<p>'+ training +'</p>'+
							'<p>'+ wname +'</p>'+
							'<p>'+ favorite +'</p>'+
							'<p>'+ howlong +'</p>'+
							'<p>'+ timeofday +'</p>'+
							'<p>'+ completiondate +'</p>'+
							'<p>'+ comments +'</p>'+
						'</div>'
					).appendTo('#dataView');
				});
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});

$('#serverData').on('pageinit', function() {
    $.couch.db("asdproject").view("app/workouts", {
    	success: function(data) {
    	console.log(data);
    		$('#workoutItems').empty();
    		$.each(data.rows, function(index, value) {
    			var item = (value.value || value.doc);
    			$('#workoutItems').append(
    				$('<li>').append(
    					$('<a>')
    						.attr("href", "workouts.html?workouts=" + item.wname)
    						.text(item.wname)
    				)
    			);
    		});
    		$('#workoutItems').listview('refresh');
    	}
    });
});

$(document).ready(function() {
// $('#addItem').on('pageinit', function(){


	// Variable defaults //
	var favoriteValue = "No",
		// wfForm = $('#workoutForm'),
		//workoutTypes = ["*Choose A Style*", "Agility", "Cardio", "Flexibility", "Strength", "Tone"],
		timeValue,
		confirmClear
		//errMsg = ge('errors')
	;
	
	// getElementById function //
	// function ge(x) {
	// 	var elementID = document.getElementById(x);
	// 	return elementID;
	// };
	
	// Create Select Element with Options//
/*	function makeWorkoutStyle() {
		var formTag = document.getElementsByTagName('form'),
			selectList = ge('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "styles");
		for(var i=0, j=workoutTypes.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optTxt = workoutTypes[i];
			makeOption.setAttribute("value", optTxt);
			makeOption.innerHTML = optTxt;
			makeSelect.appendChild(makeOption);
		}
		selectList.appendChild(makeSelect);
	};*/
	
	// //
	function getCheckboxValue() {
		if ($('#favorite').checked) {
			favoriteValue = "Yes";
		}else{
			favoriteValue = "No";
		}
	};
	
	// Find Value of selected radio button //
	function getSelectedRadio() {
		var radios = document.forms[0].timeofday;
		for (var i=0, j=radios.length; i<j; i++) {
			if (radios[i].checked) {
				timeValue = radios[i].value;
			}
		}
	};
	
	// Turn on and off form by use of case during getData() //
	function toggle(x) {
		switch(x) {
			case "on":
				$('#workoutForm').css("display", "none");
				$('#showData').css("display", "none");
				// $('#clearData').css("display", "none");
				// $('#startNew').css("display", "inline");
				// $('#saveData').css("display", "none");
				// $('#addBack').css("display", "none");
				// $('#foot').css("display", "none");
				break;
			case "off":
				$('#workoutForm').css("display", "block");
				// $('#showData').css("display", "inline");
				// $('#clearData').css("display", "inline");
				// $('#startNew').css("display", "none");
				$('#saveData').css("display", "inline");
				// $('#addBack').css("display", "inline");
				$('#foot').css("display", "block");
				$('#items').css("display", "none");
				break;
			default:
				return false;
		}
	};
	
	// Gather Form Data & Place it in an Object & Object is an Array for Form Label and Value //
	function saveData(key) {
		// Set Random Key for Stored Data //
		if(!key) {
			var id = Math.floor(Math.random()*10001);
		}else{
			id = key;
		}
		// Call Functions //
		getCheckboxValue();
		getSelectedRadio();
		var item 				= {};
			item.training 		= ["Training Style: ", $('#training').value];
			item.wname			= ["Workout Name: ", $('#wname').value];
			item.favorite		= ["Favorite: ", favoriteValue];
			item.howlong		= ["How Long: ", $('#howlong').value + " minutes"];
			item.timeofday		= ["Preferred Time: ", timeValue];
			item.completiondate	= ["Completion Date: ", $('#completiondate').value];
			item.comments		= ["Self-Motivation: ", $('#comments').value];
			
		// Save Data into Local Storage with JSON.stringify //
		localStorage.setItem(id, JSON.stringify(item));
		alert("Workout Saved!");//
		// Set dialog using Dialog //
		//$('#dialog').attr("title", "Saved!").text("Your workout has been saved.").dialog('open');
	};
	
	// Write Data from Local Storage to Browser //
	function getData() {
		// Call Function //
		toggle("on");
		if(localStorage.length === 0) {
			alert("There is no data in Local Storage. \n Default Data was added.");
			autoFillData();
		}
		// Create New View //
		var localData = ('#dataList');
		for (var i = 0, j = localStorage.length; i < j; i++) {
			var makeLi = $('<li></li>').appendTo(localData);
			var buttonsLi = $('<li></li>').appendTo(localData);
			var key = localStorage.key(i);
		 	var value = localStorage.getItem(key);
		 	var obj = JSON.parse(value);
		 		for(x in obj) {
		 			$('<p>' + obj[x][0] + " " + obj[x][1] + '</p>').appendTo(makeLi);
		 		}
		 		makeButtonsLi(localStorage.key(i), buttonsLi);
		 		$('#dataList').listview('refresh');
		};
		// Create new page //
		// var makeDiv = document.getElementById('dataList');
		// makeDiv.setAttribute("id", "items");
		// makeDiv.setAttribute("data-role", "content");

		// // var makeDiv = $(<div id="items" data-role="content"><ul data-role="listview"></ul></div>);

		// var makeList = document.createElement('ul');
		// makeList.setAttribute("data-role", "listview");
		// makeDiv.appendChild(makeList);
		// $('#dataList').append(makeDiv);
		// // Set 'items' display //
		// $('#items').css("display", "block");
		// for(var i=0, j=localStorage.length; i<j; i++) {
		// 	var makeLi = document.createElement('li');
		// 	makeLi.style.fontSize = "25px";
		// 	var buttonsLi = document.createElement('li');
		// 	makeList.appendChild(makeLi);
		// 	var key = localStorage.key(i);
		// 	var value = localStorage.getItem(key);
		// 	// Convert string from local storage into value by JSON.parse //
		// 	var obj = JSON.parse(value);
		// 	var makeSubList = document.createElement('ul');
		// 	makeLi.appendChild(makeSubList);
		// 	getImage(obj.training[1], makeSubList);
		// 	for (var x in obj) {
		// 		var makeSubLi = document.createElement('li');
		// 		makeSubList.appendChild(makeSubLi);
		// 		var optSubTxt = obj[x][0]+" "+obj[x][1];
		// 		makeSubLi.innerHTML = optSubTxt;
		// 		makeSubList.appendChild(buttonsLi);
		// 	}
		// 	makeButtonsLi(localStorage.key(i), buttonsLi);
		// }
	};
	
	// Get an image for the right category //
	function getImage(imgName, makeSubList) {
		var imageLi = $('<li></li>');
		$('makeSubList').append(imageLi);
		var newImage = $('<img>');
		var setSrc = newImage.attr("src", imgName + ".png");
		// newImage.style.paddingTop = "10px";
		$('imageLi').append(newImage);
	};
	
	// Auto populate local storage //
	function autoFillData() {
		// Retrieve JSON OBJECT from json.js //
		// Store the JSON OBJECT to local storage //
		for(var n in json) {
		var id = Math.floor(Math.random()*10001);
		localStorage.setItem(id, JSON.stringify(json[n]));
		}
	};
	
	// Make Buttons //
	// Create edit and delete buttons for each stored item when displayed //
	function makeButtonsLi(key, buttonsLi) {
		// Add edit single item button //
		var editButton = $('<a href="#" data-role="button data-mini="true" data-inline="true">Edit Workout</a>');
		// $('editButton').attr("id", "editButton");
		// $('editButton').href = "#";
		$(editButton).key = key;
		// var editTxt = "Edit Workout";
		$(editButton).on("click", editItem);
		// $('editButton').html = editTxt;
		$(buttonsLi).append(editButton);
		// $('buttonsLi').append(editButton);
		//  Create Break Between Buttons //
		// var breakTag = $('<br>').appendTo(buttonsLi);
		// $('buttonsLi').append(breakTag);
		var deleteButton = $('<a href="#" data-mini="true" data-inline="true" data-icon="delete"></a>').appendTo(buttonsLi);
		// $('deleteButton').attr("id", "deleteButton");
		// $('deleteButton').href = "#";
		$(deleteButton).key = key;
		// var deleteTxt = "Delete Workout";
		$(deleteButton).on("click", deleteItem);
		// $('deleteButton').html = deleteTxt;
		$(buttonsLi).append(deleteButton);
		// $('buttonsLi').append(deleteButton);
	};
	
	function editItem(key) {
		// Grab data from local storage for item edit //
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		// Turn form back on //
		toggle("off");
		// Populate form fields //
		$('#training').value = item.training[1];
		$('#wname').value = item.wname[1];
		if(item.favorite[1] == "Yes") {
			$('#favorite').setAttribute("checked", "checked");
		}
		$('#howlong').value = item.howlong[1];
		var radios = document.forms[0].timeofday;
		for (var i=0, j=radios.length; i<j; i++) {
			if(radios[i].value == "Morning" && item.timeofday[1] == "Morning") {
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "Afternoon" && item.timeofday[1] == "Afternoon") {
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "Evening" && item.timeofday[1] == "Evening") {
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('#completiondate').value = item.completiondate[1];
		$('#comments').value = item.comments[1];
		// Remove event listener for 'save' button //
		submitData.removeEventListener("click", saveData);
		// Change submit button value from Save Workout to Save Changes //
		$('#saveData').value = "Save Changes";
		var editSubmit = $('#saveData');
		// Save to original key value established for particular values //
		editSubmit.addEventListener("click", validate);
		editSubmit.key = key;
	};
	
	// Delete individual key storage from localStorage //
	function deleteItem() {
		var ask = confirm("Delete this workout?");
		// Confirm with the user to delete individual item //
		if(ask) {
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Workout has been deleted.");
			return false;
		// If declined, do not delete and alert the user //
		}else{
			alert("Workout was not deleted.");
		}
	};
	
	function clearData() {
		if (localStorage.length === 0) {
			alert("There is nothing to delete.");
		}else{
			var clear = confirm("Are you sure you want to delete your workouts?");
			if (clear) {
				localStorage.clear();
				alert("All workouts have been deleted.");
				window.location.reload();
				return false;
			}else{
				alert("Your workouts have not been deleted.");
			}
		}
	};
	
/*	function validate(e) {
		// Define elements we want to check //
		var getStyle = ge('styles');
		var getWname = ge('wname');
		var getCompletionDate = ge('completiondate');
		var getComments = ge('comments');
		// Reset error messages //
		errMsg.innerHTML = "";
		getStyle.style.border = "1px solid black";
		getWname.style.border = "1px solid black";
		getComments.style.border = "1px solid black";
		getCompletionDate.style.border = "1px solid black";
		// Get error messages //
		var messageAry = [];
		// Style validation //
		if(getStyle.value === "*Choose A Style*") {
			var styleError = "Please choose a style.";
			getStyle.style.border = "1px solid red";
			messageAry.push(styleError);
		}
		// Workout name validation //
		if(getWname.value === "") {
			var wNameError = "Please enter a workout name.";
			getWname.style.border = "1px solid red";
			messageAry.push(wNameError);
		}

		// Date completion validation //
		if(getCompletionDate.value === "") {
			var completionDateError = "Please enter a completion date.";
			getCompletionDate.style.border = "1px solid red";
			messageAry.push(completionDateError);
		}
		
		//Self-Motivation validation //
		if(getComments.value === "") {
			var commentsError = "Please motivate yourself.";
			getComments.style.border = "1px solid red";
			messageAry.push(commentsError);
		}
		// Display error messages //
		if(messageAry.length >= 1) {
			for (var i=0, j=messageAry.length; i<j; i++) {
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			// If errors found, stop the form from submitting and alert the user //
			alert("There are required fields left empty.");
			e.preventDefault();
			return false;
		}else{
			// If there are no errors, save the data //
			saveData(this.key);
		}
	};*/

	function validate() {
		$('#workoutForm').validate({
			invalidHandler: function(form, validator) {
				alert("There are required fields left empty.")
			},
			submitHandler: function() {
				saveData(this.key);
			}
		})
	};
	
	// Set Link & Submit Click Events // // Old Methods //
	// var displayLink = ge('showData');
	// displayLink.addEventListener("click", getData);
	// var clearButton = ge('clearData');
	// clearButton.addEventListener("click", clearData);
	// var submitData = ge('saveData');
	// submitData.addEventListener("click", validate);

	// New Methods //
	$('#showData').on("click", getData);
	$('#clearData').on("click", clearData);
	$('#saveData').on("click", validate);
	
	// Call Functions //
//	makeWorkoutStyle(); //

});