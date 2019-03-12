// Function to validate the field
interface IValidateElement {
    value: string;
    validation: any;
}
export const validate = (
    element: IValidateElement,
    formData = []
): string[] => {
    let error = ['true', ''];

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid.toString(), message] : error;
    }

    return error;
};

// Function for making the update to the form
interface IUpdateElement {
    id: string;
    event: any;
    blur: boolean;
}
export const update = (
    element: IUpdateElement,
    formData: any,
    formName: string
): {} => {
    // Setting the new form data so we dont mutate the state
    const newFormData = {
        ...formData
    };
    const newElement = {
        ...newFormData[element.id]
    };

    newElement.value = element.event.target.value;

    if (element.blur) {
        const validData = validate(newElement, formData);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    return newFormData;
};
