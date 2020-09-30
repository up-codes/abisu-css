$(function() {
  $('.btn-6')
    .on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
    })
    .on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
    	$(this).find('span').css({top:relY, left:relX})
    });
  $('[href=#]').click(function(){return false});
});


// For the spin button
$(document).ready(spinButton);
$(window).resize(spinButton);

// This is just for the Spin Button
// Couldn't find a way with CSS! :-/
function spinButton(){
	$('.spinButton').each(function(){
        // Find dimensions of button
		var buttonWidth = $(this).width(),
        buttonHeight = $(this).height(),
        // Get value for gradient size
        gradSize = buttonWidth + 100,
        // Get values to vertically center the gradient
				topOffest = (gradSize / 2) - (buttonHeight * 2);
    // Set the size and position of the gradient
    $(this).children('.gradient').width(gradSize).height(gradSize).css({'top': - topOffest});
	});
}
