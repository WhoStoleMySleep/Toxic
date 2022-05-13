import compareElementTypes from '../../js/helper-modules/compareElementTypes';
import 'jquery-ui/ui/widgets/datepicker';

const dateDropdown = document.querySelector('.js-date-dropdown__container');
let datePicker = document.querySelector('.js-date-dropdown__datepicker');

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
  type INPUT = HTMLInputElement | null
  const inputs: INPUT = document.querySelector('.js-date-dropdown__input');

  inputs!.addEventListener('click', () => {
    $('.js-date-dropdown__datepicker').datepicker({
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

      beforeShowDay: (date: Date) => {
        const date1 = $.datepicker.parseDate(
          'dd.mm.yy',
          <string>$('.js-date-dropdown__start-date').val(),
        );
        const date2 = $.datepicker.parseDate(
          'dd.mm.yy',
          <string>$('.js-date-dropdown__end-date').val(),
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
          <string>$('.js-date-dropdown__start-date').val(),
        );
        const date2 = $.datepicker.parseDate(
          'dd.mm.yy',
          <string>$('.js-date-dropdown__end-date').val(),
        );

        if (!date1 || date2) {
          $('.js-date-dropdown__start-date').val(dateText);
          $('.js-date-dropdown__end-date').val('');
          $('.end-date-visible').text('');
          $(this).datepicker('option', dateText);
        } else {
          const [day, month, year] = dateText.split('.');

          if (new Date([month, day, year].join('.')) < date1) {
            const sDate = <string>$('.js-date-dropdown__start-date').val();

            $('.js-date-dropdown__start-date').val(dateText);
            $(this).datepicker('option', null);
            $('.js-date-dropdown__end-date').val(sDate);
          } else {
            $('.js-date-dropdown__end-date').val(dateText);
            $(this).datepicker('option', null);
          }
        }
      },
    });
  });

  const buttons = () => {
    const buttonpane = document.querySelector('.ui-datepicker-buttonpane');
    datePicker = document.querySelector('.js-date-dropdown__datepicker');

    if (datePicker && buttonpane) {
      const clearBtn = document.querySelector('.ui-datepicker__btn-clear');
      const submitBtn = document.querySelector('.ui-datepicker__btn-submit');

      const addButton = (textButton: string, className: string, eventFunction: () => void) => {
        const buttonCreate = document.createElement('button');

        buttonCreate.className = `
          ${className} 
          ui-state-default 
          ui-priority-secondary 
          ui-corner-all
        `;
        buttonCreate.innerHTML = textButton;
        buttonCreate.type = 'button';
        buttonCreate.addEventListener('click', eventFunction);

        buttonpane.append(buttonCreate);

        return className;
      };

      const checkButton = (id: string) => {
        setInterval(() => {
          type HTML = HTMLElement | null;
          const item: HTML = document.querySelector(`.${id}`);

          if (item && inputs!.value) {
            item!.style.opacity = '1';
            item!.style.cursor = 'pointer';
          }
          if (item && !inputs!.value) {
            item!.style.opacity = '0.35';
            item!.style.cursor = 'default';
          }
        }, 100);
      };

      if (!clearBtn) {
        checkButton(addButton('Очистить', 'ui-datepicker__btn-clear', () => {
          const startDate: INPUT = document.querySelector(
            '.js-date-dropdown__start-date',
          );
          const endDate: INPUT = document.querySelector(
            '.js-date-dropdown__end-date',
          );
          const dateDropdownWrapper = document.querySelector(
            '.js-date-dropdown',
          );

          if (!compareElementTypes(null, dateDropdownWrapper)) {
            const numberDays = document.querySelector('.js-to-book__number-days');
            const daysSumm = document.querySelector('.js-to-book__summing-days-summ');
            const totalSumm = document.querySelector('.js-to-book__total-summ');

            numberDays!.innerHTML = '0 суток';
            daysSumm!.innerHTML = '0₽';
            totalSumm!.innerHTML = '0₽';

            startDate!.value = '';
            endDate!.value = '';

            datePicker!.remove();

            const createDatePicker = document.createElement('div');

            createDatePicker.className = 'date-dropdown__datepicker js-date-dropdown__datepicker';

            dateDropdownWrapper!.append(createDatePicker);
          }
        }));
      }
      if (!submitBtn) {
        checkButton(addButton('Применить', 'ui-datepicker__btn-submit', () => {
          datePicker!.classList.toggle('_active');
        }));
      }
    }
  };
  setInterval(buttons, 100);
};

onDateDropdownReady();
