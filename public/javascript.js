$(document).ready(function(){

  $.ajax('/cars', {
    method: 'GET',
    success: function(cars){
      for(var i in cars){
        var car = cars[i];
        var car_listing = printCarListing(car);
        $('.car-list').append(car_listing);
        addDeleteOption();
        addUpdateOption();
     }
    }
  });

  $('.car_input').on('submit', function(e){
    e.preventDefault();
    $.ajax('/cars', {
      method: 'POST',
      data: $('.car_input').serialize(),
      success: function(car){
        var car_listing = printCarListing(car);
        $('.car-list').append(car_listing);
        addDeleteOption();
        addUpdateOption();
        $('.car_input').each(function(){this.reset();});
      }
    });
  });

  function addDeleteOption(){
    $('img').on('click', function(e){
        e.preventDefault();
        var target = $(e.currentTarget);
        var id = $(this).attr('id');
        $.ajax('/cars/' + id, {
            method: 'DELETE',
            success: function(){
              target.closest('div').remove();
            }
        });
    });
  }

  function addUpdateOption(){
    $('.editLink').on('click', function(e){
        e.preventDefault();
        var id = $(this).attr('href');
        var carDiv = $(this).closest('div');
        var car = carDiv.children('ul');
        var year_details = car.text().slice(0,4);
        var make_details = car.text().slice(5);
        var updateLink = carDiv.children('.editLink');

        var edit_car_form = '<form name="car_edit" class="car_edit">'+
            '<input name="year" type="text" id="year_edit" maxlength="4" placeholder="'+year_details+'" required>'+
            '<input name="make" type="text" id="make_edit" placeholder="'+make_details+'" required>'+
            '<br><input type="submit" value="update" class="button" id="update_submit"></form>';

        car.replaceWith(edit_car_form);
        updateLink.remove();
        updateCar(id);
    });
  }

  function updateCar(id){
    $('.car_edit').on('submit', function(e){
        e.preventDefault();
        var data = $('.car_edit').serialize();
        $.ajax('/cars/' + id, {
            method: 'PUT',
            data: data,
            success: function(car){
              var car_listing = printCarListing(car);
              var carDivToReplace = $('.car_edit').closest('div');
              $(carDivToReplace).replaceWith(car_listing);
              addDeleteOption();
              addUpdateOption();
            }
        });
    });
 }

  function printCarListing(car){
    var newCar = '<div id="car_div"><img src="del.jpg" id="'+car._id+'">'+
      '<ul id="car_info">'+car.year+' '+car.make+'</ul>'+
      '<a href="'+car._id+'" class="editLink"><span id="editTool">update</span></a></div>';
    return newCar;
  }
});
