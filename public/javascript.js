$(document).ready(function(){
  var carCount = 0;

  $.ajax('/cars', {
    method: 'GET',
    success: function(cars){
      for(var i in cars){
        var car = cars[i];
        var car_listing = printCarListing(car);
        $('.database').prepend(car_listing);
        addDeleteOption();
        addUpdateOption();
        carCount++;
        $('#car_count').html(carCount + ' cars in lot.');
      }
    }
  });

  $('.car_input').on('submit', function(e){
    $.ajax('/cars', {
      method: 'POST',
      data: $('.car_input').serialize(),
      success: function(car){
        $('.car_input').each(function(){this.reset();});
        var car_listing = printCarListing(car);
        $('.database').prepend(car_listing);
        addDeleteOption();
        addUpdateOption();
        carCount = carCount + 1;
        $('#car_count').empty();
        $('#car_count').html(carCount + ' cars in lot.');
      }
    });
  });

  function addDeleteOption(){
    $('.delete_img').on('click', function(e){
        e.preventDefault();
        var id = $(this).attr('id');
        $.ajax('/cars/' + id, {
            method: 'DELETE',
            success: function(){
             carCount = carCount - 1;
             $('#car_count').empty();
             $('#car_count').html(carCount + ' cars in lot.');
            }
        });
    });
  }

  function addUpdateOption(){
    $('.editLink').on('click', function(e){
        e.preventDefault();
        var id = $(this).attr('href');
        var car = $(this).closest('ul');
        // var car = $target.closest('div');
        var year_details = car.text().slice(0,4);
        var make_details = car.text().slice(5,-6);
        var edit_car_form = '<form name="car_edit" class="car_edit">'+
            '<input name="year" type="text" id="year_edit" maxlength="4" placeholder="'+year_details+'" required>'+
            '<input name="make" type="text" id="make_edit" placeholder="'+make_details+'" required>'+
            '<input type="submit" value="update" class="button" id="update_submit"></form>';

        car.replaceWith(edit_car_form);
        updateCar(id);
    });
  }

  function updateCar(id){
    $('.car_edit').on('submit', function(e){
        e.preventDefault();
        $.ajax('/cars/' + id, {
            method: 'PUT',
            data: $('.car_edit').serialize(),
            success: function(car){
              var car_listing = printCarListing(car);
              var carToUpdate = $('.car_edit').closest('div');
              $(carToUpdate).replaceWith(car_listing);
              addDeleteOption();
              addUpdateOption();
            }
        });
    });
 }

  function printCarListing(car){
    var newCar = '<div class="row">'+
      '<ol class="col-md-12" id="car_div"><img src="del.jpg" id="'+car._id+'" class="delete_img">'+
      '<ul id="car_info">'+car.year+' '+car.make+' <a href="'+car._id+'" class="editLink">update</a></ol></li>'+
      '<hr></div>';
    return newCar;
  }

  function incrementCount(){
    carCount = carCount + 1;
    $('#car_count').empty();
    $('#car_count').html(carCount + ' cars in lot.');
  }

  function deductCount(){

  }
});
