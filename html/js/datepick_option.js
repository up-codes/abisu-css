// JavaScript Document

$(function () {
  var today = new Date();
  var year = today.getFullYear();

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  var nextyear = new Date();
  nextyear.setYear(nextyear.getFullYear() + 1);

  $(".datepick input").each(function () {
      $(this).attr({
          "readonly": "readonly",
          "autocomplete": "off",
          "placeholder": "カレンダーが表示されます",
      });
      $.datetimepicker.setLocale('ja');
      $(this).datetimepicker({
          format: 'Y/m/d H:i',

          yearStart: year,
          yearEnd: year + 1,

          scrollMonth: false,
          dayOfWeekStart: 1,

          minDate: tomorrow,
          maxDate: nextyear,
          defaultDate: +tomorrow,

          defaultTime: '9:00',
          allowTimes: [
              '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:20', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
          ],

      });
  });

});
