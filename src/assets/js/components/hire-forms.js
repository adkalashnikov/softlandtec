import tippy, { delegate } from 'tippy.js';

document.addEventListener('DOMContentLoaded', () => {
    // hire forms
    const btnAddSpecialist = document.querySelector('.js-show-s-form'),
        btnAddTurnkey = document.querySelector('.js-show-t-form'),
        btnStep2Hire = document.querySelector('.js-hire-st2-btn'),
        formStep2 = document.querySelector('.form-hire-st2'),
        formStep2Turnkey = document.querySelector('.js-form-st2-turnkey'),
        formStep3 = document.querySelector('.form-hire-st3'),
        formStep2Alert = document.querySelector('.js-form-st2-alert'),
        formStep2TurnkeyAlert = document.querySelector('.js-st2-turnkey-alert'),
        tagsStep2 = document.querySelector('.js-st-2-tags'),
        step1Section = document.querySelector('.st-1'),
        step2Section = document.querySelector('.js-st2-specialist'),
        step2TurnkeySection = document.querySelector('.js-st2-turnkey'),
        step3Section = document.querySelector('.st-3'),
        step3TextArea = document.querySelector('.js-st-3-textarea'),
        step3TagsWrapper = document.querySelector('.js-st-3-tags'),
        input1 = document.querySelector('.input-tag-p1'),
        input2 = document.querySelector('.input-tag-p2'),
        input3 = document.querySelector('.input-tag-p3'),
        inputPDesc = document.querySelector('.js-input-p-desc'),
        inputPDescCounter = document.querySelector('.js-input-p-desc-count'),
        modal = document.querySelector('.modal-hire');

    let isSpecialistsAdded = false,
        isTurnkeyFormFilled = false,
        orderDetails = '';

    function checkIsFieldEmpty(input, valueLength = 0) {
        return input.value.length > valueLength && input.value !== '' && input.value !== '0';
    }

    function validateStep2Field(input) {
        if(!checkIsFieldEmpty(input)) {
            input.classList.add('error');
            return false;
        } else {
            input.classList.remove('error');
            return true;
        }
    }

    function validateStep2TurnkeyField(input) {
        if(!checkIsFieldEmpty(input, 2)) {
            input.classList.add('error');
            return false;
        } else {
            input.classList.remove('error');
            return true;
        }
    }

    function addSpecialistTag() {
        if(validateStep2Field(input1) && validateStep2Field(input2) && validateStep2Field(input3)) {
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

    function deleteTagsHandler() {
        document.addEventListener('click', (e) => {
            if(e.target.classList.contains('f-tag-delete')) {
                e.target.closest('.f-tag').remove();
            }
        });
    }

    function handlingCloseModal () {
        isSpecialistsAdded = false;
        isTurnkeyFormFilled = false;
        step1Section.classList.remove('hidden');
        step2Section.classList.add('hidden');
        step2TurnkeySection.classList.add('hidden');
        step3Section.classList.add('hidden');
        formStep2.reset();
        tagsStep2.innerHTML = '';
        formStep2Alert.classList.add('hidden');
        formStep2TurnkeyAlert.classList.add('hidden');
        formStep2Turnkey.reset();
        formStep3.reset();
        step3TagsWrapper.innerHTML = '';
        orderDetails = '';
        step2ClearFields();
        step2TurnkeyClearFields();
        inputPDescCounter.innerHTML = 'Characters count: 0/1250';
    }

    function closeModalByESC() {
        document.addEventListener('keydown', (e) => {
            if(e.keyCode === 27) {
                handlingCloseModal();
            }
        });
    }

    function step2TurnkeyDescriptionHandler() {
        inputPDesc.addEventListener('keyup', () => {
            const textArea = inputPDesc.value.length;
            inputPDescCounter.innerHTML = `Characters count: ${textArea}/1250`;
        });
        inputPDesc.addEventListener('keydown', () => {
            const textArea = inputPDesc.value.length;
            inputPDescCounter.innerHTML = `Characters count: ${textArea}/1250`;
        });
    }

    function initSpecialistOrder() {
        btnAddSpecialist.addEventListener('click', () => {
            step1Section.classList.add('hidden');
            step2Section.classList.remove('hidden');
        });
    }

    function initTurnkeyOrder() {
        btnAddTurnkey.addEventListener('click', () => {
            step1Section.classList.add('hidden');
            step2TurnkeySection.classList.remove('hidden');
        });
    }

    function step2ClearFields() {
        input1.classList.remove('error');
        input2.classList.remove('error');
        input3.classList.remove('error');
    }

    function step2TurnkeyClearFields() {
        inputPDesc.classList.remove('error');
    }

    function step2SpecialistAddHandler() {
        btnStep2Hire.addEventListener('click', (e) => {
            e.preventDefault();
            addSpecialistTag();
        });
    }

    function step2SpecialistFormHandler() {
        formStep2.addEventListener('submit', (e) => {
            e.preventDefault();

            if(!isSpecialistsAdded) {
                addSpecialistTag();
            }

            if(isSpecialistsAdded) {
                formStep2Alert.classList.add('hidden');
                step2Section.classList.add('hidden');
                step3AddTags();
                step3TextArea.value  = `Request \n\nType: ${formStep2.dataset.orderType} \n\nDetails:${orderDetails}`;
                step3Section.classList.remove('hidden');
            } else {
                formStep2Alert.classList.remove('hidden');
            }
        });
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

    function validateStep2TurnkeyForm() {
        if(validateStep2TurnkeyField(inputPDesc)) {
            isTurnkeyFormFilled = true;
            formStep2Alert.classList.add('hidden');
        } else {
            isTurnkeyFormFilled = false;
            formStep2TurnkeyAlert.classList.remove('hidden');
        }
    }

    function step2TurnkeyFormHandler() {
        formStep2Turnkey.addEventListener('submit', (e) => {
            e.preventDefault();

            validateStep2TurnkeyForm();

            if(isTurnkeyFormFilled) {
                step2TurnkeySection.classList.add('hidden');
                step3TextArea.value  = `Request \n\nType: ${formStep2Turnkey.dataset.orderType} \n\nDescription:\n${inputPDesc.value}`;
                step3Section.classList.remove('hidden');
            }
        });
    }

    initSpecialistOrder();
    initTurnkeyOrder();
    step2SpecialistAddHandler();
    step2SpecialistFormHandler();
    step2TurnkeyFormHandler();
    step2TurnkeyDescriptionHandler();
    deleteTagsHandler();
    closeModalByESC();

    modal.addEventListener('modalClosed', handlingCloseModal);
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