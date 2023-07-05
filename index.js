const lengthSelectorInput = document.querySelector('#password-range-selector'); // Password length slider reference is saved into lengthSelectorInput variable
const passwordLengthDisplay = document.getElementById('password-length-value'); // Password length value reference is saved into passwordLengthDisplay variable
const generatePasswordButton = document.getElementById('generate-password-button'); // Generate password button reference is saved into generatePasswordButton variable
const passwordDisplay = document.getElementById('password-display'); // Password display reference is saved into passwordDisplay variable
const passwordCopyButton = document.getElementById('password-copy-button'); // Password copy button reference is saved into passwordCopyButton variable

/**
 *  1. declare a variable which holds the selected password length
 *  2. declare a variable which holds an array having all the configurations selected
 *  3. declare a variable which holds the final password to be displayed
 *  4. declare UPPER_CASE, LOWER_CASE, NUMBERS, SYMBOLS
 */
let selectedPasswordLength = 4;
let checkedConfigurations = [];
let generatedPassword = '';
const UPPER_CASE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N','O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const LOWER_CASE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n','o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
const SYMBOLS = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

/**
 * 
 *  1. Write a function that runs when input event happens on Input range selector component. 
 *  2. get the event.target.value
 *  3. Update selectedPasswordLength value everytime the password length changes via slider input
 *  4. set the value to textContent of passwordLengthDisplay
 * 
 */

function inputRangeEventHandler(event) {
    const value = event.target.value 
    selectedPasswordLength = value
    passwordLengthDisplay.textContent = value
}


/**
 * INPUT is an EVENT which can happen on INPUT ELEMENT
 * 
 *  1. target input raneg selector element (i.e. lengthSelectorInput)
 *  2. apply addEventListener method on it
 *
 * 
 */

lengthSelectorInput.addEventListener('input', inputRangeEventHandler)



/**
 * 1. get all the configuration checkbox inputs.
 */

const upperCaseCheckbox = document.getElementById('uppercase');
const lowerCaseCheckbox = document.getElementById('lowercase');
const symbolCheckbox = document.getElementById('symbols');
const numberCheckbox = document.getElementById('numbers');

/**
 *  1. write a function that runs when input event happens on checkbox inputs
 */

function checkboxInputHandler(event){
    const value = event.target.value ;
    const isChecked = event.target.checked;

    document.querySelector('.indicator1').classList.remove('highlight')
    document.querySelector('.indicator2').classList.remove('highlight')
    document.querySelector('.indicator3').classList.remove('highlight')
    document.querySelector('.indicator4').classList.remove('highlight')

    if(isChecked){
        checkedConfigurations.push(value)
    }else{
        const newConfigurations = []
        for(let ind = 0 ; ind < checkedConfigurations.length ; ind++){

            const currentConfig = checkedConfigurations[ind];

            if(currentConfig !== value){

                newConfigurations.push(currentConfig)

            }

        }

        checkedConfigurations = newConfigurations
    }

    const configurationsLength = checkedConfigurations.length;

    for(let ind = 0 ; ind < configurationsLength ; ind++){
        const targetStrengthIndicator = document.querySelector('.indicator'+ (ind + 1))
        targetStrengthIndicator.classList.add('highlight')
    }

    if(configurationsLength > 0){
        generatePasswordButton.classList.remove('--disabled')
    }else{
        generatePasswordButton.classList.add('--disabled')
    }
    
}


/**
 *  1. add eventListeners for all the checkbox inputs. 
 */

upperCaseCheckbox.addEventListener('input', checkboxInputHandler)
lowerCaseCheckbox.addEventListener('input', checkboxInputHandler)
symbolCheckbox.addEventListener('input', checkboxInputHandler)
numberCheckbox.addEventListener('input', checkboxInputHandler)


/**
 *  1. Write a function that runs when a click event happens on generatePasswordButton button
 */

function generatePasswordButtonClickHandler() {
    generatedPassword = ''

    let configToBeConsidered = [];

    for(let ind = 0  ; ind < checkedConfigurations.length ; ind++){
        configToBeConsidered.push(checkedConfigurations[ind])
    }


    while (generatedPassword.length < selectedPasswordLength) {
        const typePicker = Math.floor(Math.random() * checkedConfigurations.length);
        const type = checkedConfigurations[typePicker]

        const isTypeAvailableInConfigToBeConsidered = configToBeConsidered.includes(type)

        if(isTypeAvailableInConfigToBeConsidered){
            const newConfgToBeConsidered = [];
            for(let ind = 0 ; ind < configToBeConsidered.length ; ind++){
                if(configToBeConsidered[ind] !== type){
                    newConfgToBeConsidered.push(configToBeConsidered[ind]);
                }
            }
            configToBeConsidered = newConfgToBeConsidered
        }

        if(isTypeAvailableInConfigToBeConsidered || configToBeConsidered.length === 0 ){
            let targetType = null;
    
            if (type === 'uppercase') {
                targetType = UPPER_CASE
            } else if (type === 'lowercase') {
                targetType = LOWER_CASE
            } else if (type === 'numbers') {
                targetType = NUMBERS
            } else if (type === 'symbols') {
                targetType = SYMBOLS
            }
    
            const charPicker = Math.floor(Math.random() * targetType.length);
            const character = targetType[charPicker]
    
            generatedPassword += character
        }
    }


    passwordDisplay.textContent = generatedPassword
    passwordCopyButton.classList.remove('--disabled')

}


/**
 *  1. add eventListener for generate password button (i.e. generatePasswordButton)
 */

generatePasswordButton.addEventListener('click', generatePasswordButtonClickHandler);

/**
 * 1. Write a function that runs when a click action happens on passwordCopyButton
 */

function passwordCopyHandler() {
    navigator.clipboard.writeText(generatedPassword)
}

/**
 *  1. add eventListener for password copy button (i.e passwordCopyButton)
 */

passwordCopyButton.addEventListener('click', passwordCopyHandler )



