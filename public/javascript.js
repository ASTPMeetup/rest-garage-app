$(document).ready(function(){
$('.button').hover(function(){ $(this).css('opacity', '0.7');}, function(){ $(this).css('opacity', '1');});

  $.ajax('/cars', {
    method: 'GET',
    success: function(cars){
      for(var i in cars){
        var car = cars[i];
        var car_listing = printCarListing(car);
        $('.database').prepend(car_listing);
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
        $('.car_input').each(function(){this.reset();});
        var car_listing = printCarListing(car);
        $('.database').prepend(car_listing);
        addDeleteOption();
        addUpdateOption();
      }
    });
  });

  function addDeleteOption(){
    $('.delete_img').on('click', function(e){
        e.preventDefault();
        var id = $(this).attr('id');
        var $this = $(this);
        $.ajax('/cars/' + id, {
            method: 'DELETE',
            success: function(){
             $this.closest("div").remove();
            }
        });
    });
  }

  function addUpdateOption(){
    $('.editLink').on('click', function(e){
        e.preventDefault();
        var id = $(this).attr('href');
        var car = $(this).closest('ul');
        var year_details = $(this).siblings("#item1").text();
        var color_details = $(this).siblings("#item2").text();
        var make_details = $(this).siblings("#item3").text();
        var mileage_details = $(this).siblings("#item4").text().slice(9, 17);
        var edit_car_form = '<img src="del.jpg" id="'+id+'" class="delete_img"><form name="car_edit" class="car_edit">'+
            '<input name="year" type="text" id="year_edit" maxlength="4" value="'+year_details+'" required>'+
            '<input name="color" type="text" id="color_edit" value="'+color_details+'" required>'+
            '<input name="make" type="text" id="make_edit" value="'+make_details+'" required>'+
            '<input name="mileage" type="text" id="mileage_edit" value="'+mileage_details+'" required>'+
            '<input type="submit" value="update" class="button" id="update_submit"></form>';

        car.replaceWith(edit_car_form);
        car.replaceWith(car);
        updateCar(id);

        $('.button').hover(function(){ $(this).css('opacity', '0.7');}, function(){ $(this).css('opacity', '1');});
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
    var newCar = '<div class="row" id="' + car.make + car._id.substring(10,13) + '">'+
      '<ol class="col-md-12" id="car_div"><ul style="padding-left: 5px;"><img src="del.jpg" id="'+car._id+'" class="delete_img">'+
      '<span id="item1">'+car.year+'</span> <span id="item2">'+car.color+'</span> <span id="item3">'+car.make+'</span>'+
      ' (<span id="item4">mileage: '+car.mileage+'</span>) <a href="'+car._id+'" class="editLink">update</a></ol></li>'+
      '<hr></div>';
    return newCar;
  }
});
