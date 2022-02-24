import compareElementTypes from '../../js/module/compareElementTypes';
import 'jquery-ui/ui/widgets/datepicker';

(function globalDateDropdown() {
  const dateDropdown = document.querySelector('.date-dropdown');
  let datePicker = document.querySelector('.date-dropdown__datepicker');

  if (!compareElementTypes(null, dateDropdown, datePicker)) {
    dateDropdown!.addEventListener('click', (e) => {
      const element = e.target as Element;
      const tagName = element!.tagName.toLowerCase();

      if (compareElementTypes(tagName, 'input', 'label')) {
        datePicker!.classList.toggle('_active');
      }
    });
  }

  const onDateDropdownReady = () => {
    const inputs = document.querySelector('.date-dropdown__elem > input');

    inputs!.addEventListener('click', () => {
      $('.date-dropdown__datepicker').datepicker({
        showButtonPanel: true,
        minDate: 0,
        firstDay: 1,
        monthNames: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь',
        ],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        dateFormat: 'dd.mm.yy',

        beforeShowDay: function beforeShowDay(date: Date) {
          const date1 = $.datepicker.parseDate(
            'dd.mm.yy',
            <string>$('.date-dropdown__start-date').val()
          );
          const date2 = $.datepicker.parseDate(
            'dd.mm.yy',
            <string>$('.date-dropdown__end-date').val()
          );

          if (date1 && date && date1.getTime() === date.getTime()) {
            return [true, 'ui-red-start', ''];
          }
          if (date2 && date && date2.getTime() === date.getTime()) {
            return [true, 'ui-red-end', ''];
          }

          if (date >= date1 && date <= date2) {
            return [true, 'ui-state-selected-range', ''];
          }

          return [true, '', ''];
        },

        onSelect: function onSelect(dateText) {
          const date1 = $.datepicker.parseDate(
            'dd.mm.yy',
            <string>$('.date-dropdown__start-date').val()
          );
          const date2 = $.datepicker.parseDate(
            'dd.mm.yy',
            <string>$('.date-dropdown__end-date').val()
          );

          if (!date1 || date2) {
            $('.date-dropdown__start-date').val(dateText);
            $('.date-dropdown__end-date').val('');
            $('.end-date-visible').text('');
            $(this).datepicker('option', dateText);
          } else {
            const [day, month, year] = dateText.split('.');

            if (new Date([month, day, year].join('.')) < date1) {
              const sDate = <string>$('.date-dropdown__start-date').val();

              $('.date-dropdown__start-date').val(dateText);
              $(this).datepicker('option', null);
              $('.date-dropdown__end-date').val(sDate);
            } else {
              $('.date-dropdown__end-date').val(dateText);
              $(this).datepicker('option', null);
            }
          }
        },
      });
    });

    const buttons = () => {
      const buttonpane = document.querySelector('.ui-datepicker-buttonpane');
      datePicker = document.querySelector('.date-dropdown__datepicker');

      if (datePicker && buttonpane) {
        const clearBtn = document.querySelector('.ui-datepicker__btn-clear');
        const submitBtn = document.querySelector('.ui-datepicker__btn-submit');

        const addSubmitBtn = () => {
          const onClickSubmitBtn = () => {
            datePicker!.classList.toggle('_active');
          };

          const submitCreate = document.createElement('button');

          submitCreate.className = `
            ui-datepicker__btn-submit 
            ui-state-default 
            ui-priority-secondary 
            ui-corner-all
          `;
          submitCreate.innerHTML = 'Применить';
          submitCreate.type = 'button';
          submitCreate.addEventListener('click', onClickSubmitBtn);

          buttonpane.append(submitCreate);
        };

        const addClearBtn = () => {
          const onClickClearBtn = () => {
            type Input = HTMLInputElement | null;

            const startDate: Input = document.querySelector(
              'input.date-dropdown__start-date'
            );
            const endDate: Input = document.querySelector(
              'input.date-dropdown__end-date'
            );
            const dateDropdownWrapper = document.querySelector(
              '.date-dropdown-wrapper'
            );

            if (!compareElementTypes(null, dateDropdownWrapper)) {
              startDate!.value = '';
              endDate!.value = '';

              datePicker!.remove();

              const createDatePicker = document.createElement('div');

              createDatePicker.className = 'date-dropdown__datepicker';

              dateDropdownWrapper!.append(createDatePicker);
            }
          };

          const clearCreate = document.createElement('button');

          clearCreate.className = `
            ui-datepicker__btn-clear 
            ui-state-default 
            ui-priority-secondary 
            ui-corner-all
          `;
          clearCreate.innerHTML = 'Очистить';
          clearCreate.type = 'button';
          clearCreate.addEventListener('click', onClickClearBtn);

          buttonpane.append(clearCreate);
        };

        if (!clearBtn) {
          addClearBtn();
        }
        if (!submitBtn) {
          addSubmitBtn();
        }
      }
    };
    setInterval(buttons, 100);
  };

  onDateDropdownReady();
})();
