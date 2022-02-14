require('jquery-ui/ui/widgets/datepicker');



let num = 0;
$('.date-dropdown__elem > input').click(() => {
  document.getElementById('datepicker').classList.toggle('active')
  document.getElementById('datepicker').style.height = 'auto'
   setTimeout(function(){
     if(num == 2){
       num = 0
     }
     num++;
     if(num == 2){
       document.getElementById('datepicker').style.height = 0
     }
   }, 250)
})

$('.date-dropdown').ready(function() {
     $(function() {
        $('.date-dropdown__elem > input').click(function() {
          $("#datepicker").datepicker({
            showButtonPanel: true,
            minDate: 0,
            firstDay: 1,
            monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            dateFormat: 'dd.mm.yy',
            beforeShowDay:function(date) {
              var date1 = $.datepicker.parseDate('dd.mm.yy', $('#start-date').val());
              var date2 = $.datepicker.parseDate('dd.mm.yy', $('#end-date').val());
              if (date1 && date && (date1.getTime() == date.getTime())) {
                return [true, 'ui-red-start', ''];
              }
              if (date2 && date && (date2.getTime() == date.getTime())) {
                return [true, 'ui-red-end', ''];
              }

              if (date >= date1 && date <= date2) {
                return [true, 'ui-state-selected-range', ''];
              }
              var d = date.getTime();

              return [true, '', ''];
            },
            onSelect: function(dateText, inst) {
              var date1 = $.datepicker.parseDate('dd.mm.yy', $('#start-date').val());
              var date2 = $.datepicker.parseDate('dd.mm.yy', $('#end-date').val());
              if (!date1 || date2) {
                $('#start-date').val(dateText);
                $('#end-date').val('');
                $('.end-date-visible').text('');
                $(this).datepicker('option', dateText);
              } else {
              	let [day, month, year] = dateText.split('.')
                if (new Date(`${month}.${day}.${year}`) < date1) {
                  var sDate = $('#start-date').val();
                  $('#start-date').val(dateText);
                  $(this).datepicker('option', null);

                  $('#end-date').val(sDate);

                } else {
                  $('#end-date').val(dateText);
                  $(this).datepicker('option', null);
                }
              }
            }
          });
        })
     });
  setInterval(function() {
     let doneButton = document.querySelector('.ui-datepicker-done')
     if(doneButton === null){
         $('<button/>', {
            class: 'ui-datepicker-done ui-state-default ui-priority-secondary ui-corner-all',
            type: 'button',
         }).html('Применить').appendTo('.ui-datepicker-buttonpane').click(function(){
            document.getElementById('datepicker').classList.toggle('active')
            setTimeout(function() {
              num = 0;
              document.getElementById('datepicker').style.height = 0;
            }, 250)
         })
     }

     let clearButton = document.querySelector('.ui-datepicker-clear')
     if(clearButton === null){
         $('<button/>', {
            class: 'ui-datepicker-clear ui-state-default ui-priority-secondary ui-corner-all',
            type: 'button',
         }).html('Очистить').appendTo('.ui-datepicker-buttonpane').click(function(){
            if($('datepicker') !== undefined){
              document.querySelector('#start-date').value = ''
              document.querySelector('#end-date').value = ''

              document.querySelector('#datepicker').remove()

              $('<div/>', {
                 id: 'datepicker'
              }).appendTo('.date-dropdown-wrapper')
              num--;
            }
         })
     }
   }, 1);
});
