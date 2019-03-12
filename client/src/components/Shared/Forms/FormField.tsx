import * as React from 'react';

// Declaring the interface for the incoming form data
interface IFormData {
    element: string;
    config: object;
    value: string;
}

// Declaring the props interface for the FormField props
interface IFormFieldProps {
    formData: IFormData;
    id: string;
    onChange({}): any;
}

const FormField: React.FunctionComponent<IFormFieldProps> = (
    props
): JSX.Element => {
    const renderTemplate = (): any => {
        let formTemplate = null;

        switch (props.formData.element) {
            case 'input':
                formTemplate = (
                    <div className="formBlock">
                        <input
                            {...props.formData.config}
                            value={props.formData.value}
                            // tslint:disable-next-line
                            onBlur={(
                                event: React.FormEvent<HTMLInputElement>
                            ) =>
                                props.onChange({
                                    event,
                                    id: props.id,
                                    blur: true
                                })
                            }
                            // tslint:disable-next-line
                            onChange={(
                                event: React.FormEvent<HTMLInputElement>
                            ) =>
                                props.onChange({
                                    event,
                                    id: props.id,
                                    blur: false
                                })
                            }
                        />
                    </div>
                );
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    };
    return <div>{renderTemplate()}</div>;
};

export default FormField;
