import tippy, { delegate } from 'tippy.js';

document.addEventListener('DOMContentLoaded', () => {
    // hire forms
    const btnAddSpecialist = document.querySelector('.js-show-s-form'),
        btnAddTurnkey = document.querySelector('.js-show-t-form'),
        btnStep2Hire = document.querySelector('.js-hire-st2-btn'),
        body = document.querySelector('body'),
        formStep2 = document.querySelector('.form-hire-st2'),
        formStep3 = document.querySelector('.form-hire-st3'),
        formStep2Alert = document.querySelector('.js-form-st2-alert'),
        tagsStep2 = document.querySelector('.js-st-2-tags'),
        step1Section = document.querySelector('.st-1'),
        step2Section = document.querySelector('.st-2'),
        step3Section = document.querySelector('.st-3'),
        step3TextArea = document.querySelector('.js-st-3-textarea'),
        step3TagsWrapper = document.querySelector('.js-st-3-tags'),
        input1 = document.querySelector('.input-tag-p1'),
        input2 = document.querySelector('.input-tag-p2'),
        input3 = document.querySelector('.input-tag-p3');

    let isFieldsEmpty = true,
        isSpecialistsAdded = false,
        orderDetails = '';

    function checkIsFieldEmpty(input) {
        return input.value.length > 0 && input.value !== '' && input.value !== '0';
    }

    function validateStep2Field(input) {
        if(!checkIsFieldEmpty(input)) {
            input.classList.add('error');
            isFieldsEmpty = true;
        } else {
            input.classList.remove('error');
            isFieldsEmpty = false;
        }
    }

    function addSpecialistTag() {
        validateStep2Field(input1);
        validateStep2Field(input2);
        validateStep2Field(input3);

        if(!isFieldsEmpty) {
            tagsStep2.innerHTML += `<div class="f-tag" data-technology="${input1.value}"  data-snum="${input2.value}"  data-enum="${input3.value}">
                <span class="f-tag-text">${input1.value}, ${input3.value} years</span>
                <span class="f-tag-delete"
                    data-tippy-content="${input2.value} specialist(s), <br>
                    ${input1.value}, <br>
                    ${input3.value} years of experience"></span>
                </div>`;

            isSpecialistsAdded = true;
            formStep2Alert.classList.add('hidden');
            formStep2.reset();
        } else {
            isSpecialistsAdded = false;
        }
    }

    function step3AddTags() {
        let tags = [].slice.call(tagsStep2.querySelectorAll('.f-tag'));

        tags.forEach((tag) => {
            let newTag = tag.cloneNode(true),
                tagInfo = newTag.querySelector('.f-tag-delete'),
                tagTitle = newTag.querySelector('.f-tag-text');
            tagTitle.innerText = newTag.dataset.technology;
            tagInfo.classList = 'f-tag-tooltip';
            step3TagsWrapper.appendChild(newTag);

            orderDetails += `\n- \nTechnology: ${newTag.dataset.technology} \nNumber of specialists: ${newTag.dataset.snum} \nExperience: ${newTag.dataset.enum}`;
        });
    }

    btnAddSpecialist.addEventListener('click', () => {
        step1Section.classList.add('hidden');
        step2Section.classList.remove('hidden');
        formStep2.dataset.orderType = 'Specialist';
    });

    btnAddTurnkey.addEventListener('click', () => {
        step1Section.classList.add('hidden');
        step2Section.classList.remove('hidden');
        body.classList.add('modal-dark');
        step2Section.classList.add('dark');
        step3Section.classList.add('dark');
        formStep2.dataset.orderType = 'Turnkey Order';
    });

    btnStep2Hire.addEventListener('click', (e) => {
        e.preventDefault();
        addSpecialistTag();
    });

    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('f-tag-delete')) {
            e.target.closest('.f-tag').remove();
        }
    });

    formStep2.addEventListener('submit', (e) => {
        e.preventDefault();
        addSpecialistTag();

        if(!isFieldsEmpty && tagsStep2.childNodes.length) {
            formStep2Alert.classList.add('hidden');
            step2Section.classList.add('hidden');
            step3AddTags();
            step3TextArea.value  = `Request \n\nType: ${formStep2.dataset.orderType} \n\nDetails:${orderDetails}`;
            step3Section.classList.remove('hidden');
        } else {
            formStep2Alert.classList.remove('hidden');
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.keyCode === 27) {
            isFieldsEmpty = true;
            isSpecialistsAdded = false;
            step1Section.classList.remove('hidden');
            step2Section.classList.add('hidden');
            step2Section.classList.remove('dark');
            step3Section.classList.add('hidden');
            step3Section.classList.remove('dark');
            body.classList.remove('modal-dark');
            formStep2.dataset.orderType = '';
            formStep2.reset();
            tagsStep2.innerHTML = '';
            formStep2Alert.classList.add('hidden');
            formStep3.reset();
            step3TagsWrapper.innerHTML = '';
            orderDetails = '';
        }
    });
    // /hire forms

    // tags tooltips
    delegate('.js-st-3-tags', { target: '.f-tag-tooltip' }); // needed for dynamically added tooltips
    tippy.setDefaultProps({
        offset: [ 0, 6 ],
        animation: 'shift-away',
        placement: 'bottom',
        allowHTML: true,
        zIndex: 100001
    });
    // /tags tooltips
});