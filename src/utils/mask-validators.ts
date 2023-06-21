import { getTodayDate } from "./utils";

export { dateMask, addTaskFieldsValidation }

/**
* date field mask
* @param {inputElem} - date input elem
*/
function dateMask(inputElem: HTMLInputElement) {
  inputElem.addEventListener("keypress", (event: KeyboardEvent) => {
    if ((event.charCode < 48 && event.charCode !== 46) || event.charCode > 57) {
      event.preventDefault();
    }
    if (event.charCode === 46 && inputElem.value.match(/./g)?.length === 2) {
      event.preventDefault();
    }
  });

  inputElem.addEventListener("input", () => {
    if (inputElem.value.length === 3 && !inputElem.value.endsWith(".")) {
      inputElem.value = inputElem.value.substring(0, 2) + "." + inputElem.value.substring(2);
    }
    if (inputElem.value.length === 6 && !inputElem.value.endsWith(".")) {
      inputElem.value = inputElem.value.substring(0, 5) + "." + inputElem.value.substring(5);
    }
  });
}

/**
* date field validator
* @param {inputElem} - date input elem
* @param {btnElem} - add button input elem
* @param {inputNameElem} - task name input elem
*/
function addTaskFieldsValidation(inputElem: HTMLInputElement, inputNameElem: HTMLInputElement) {
  const today: number = new Date(getTodayDate().split(".").reverse().join("-")).getTime();
  const PATTERN: RegExp = /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g;

  inputElem.addEventListener("input", () => {
    if (!inputElem.value.match(PATTERN) || inputElem.value.length !== 10) {
      inputElem.classList.add("invalid");
    } else if (inputElem.classList.contains("invalid")) {
      const inputedDate = new Date(inputElem.value.split(".").reverse().join("-")).getTime();
      if (inputedDate >= today) {
        inputElem.classList.remove("invalid");
      }
    }
  });

  inputNameElem.addEventListener("input", () => {
    if (inputNameElem.value.trim().length > 0 && inputNameElem.classList.contains("invalid")) {
      inputNameElem.classList.remove("invalid");
    } else if (inputNameElem.value.trim().length === 0) {
      inputNameElem.classList.add("invalid");
    }
  })

  inputNameElem.addEventListener("blur", () => {
    if (inputNameElem.value.trim().length > 0 && inputNameElem.classList.contains("invalid")) {
      inputNameElem.classList.remove("invalid");
    } else if (inputNameElem.value.trim().length === 0) {
      inputNameElem.classList.add("invalid");
    }
  })
}
