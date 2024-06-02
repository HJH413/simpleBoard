import React, { useEffect, useState } from "react";
import boardModify from "../../pages/BoardModify";

const ValidationInput = (props) => {
    const [messageOn, setMessageOn] = useState(props.messageOn || false);
    const [validationValue, setValidationValue] = useState(props.value || "");
    const [requiredValue, setRequiredValue] = useState(props.requiredValue || false);
    const [validationMessage, setValidationMessage] = useState("");

    // 유효성 검사하는 로직
    const validation = () => {
        if (props.valueType === "author") { //작성자
            // 숫자, 영문, 한글만 입력할 수 있도록 정규식 검사
            const isValid = /^[a-zA-Z0-9가-힣]*$/.test(validationValue) && validationValue.length <= 4;
            const message = isValid ? "" : "4글자 이하 한글, 영문, 숫자만 입력 가능 합니다.";

            setValidationMessage(message);

            if (props.onValidationChange) {
                props.onValidationChange(props.id, isValid);
            }

            return message;
        }

        if (props.valueType === "title") { // 제목
            // 숫자, 영문, 한글만 입력할 수 있도록 정규식 검사
            const isValid = validationValue.length <= 99;
            const message = isValid ? "" : "99글자 이하 입력 가능 합니다.";

            setValidationMessage(message);

            if (props.onValidationChange) {
                props.onValidationChange(props.id, isValid);
            }

            return message;
        }

        if (props.valueType === "password" && validationValue.length > 0) {
            const isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,15}$/.test(validationValue);
            const message = isValid ? "" : "4글자 이상 16글자 미만, 영문/숫자/특수문자가 포함되어야 합니다.";

            setValidationMessage(message);

            if (props.onValidationChange) {
                props.onValidationChange(props.id, isValid);
            }

            return message;
        }
    }

    // 입력 값 변경 핸들러
    const setValue = (e) => {
        const newValue = e.target.value;
        setValidationValue(newValue);

        if (props.onChange) {
            props.onChange(newValue);
        }
    };

    useEffect(() => {
        validation();
    }, [validationValue])

    return (
        <>
            <label htmlFor={props.id}>{props.label}
                {requiredValue ? " *"  : null}
            </label>
            <input
                id={props.id}
                type={props.type}
                value={validationValue}
                onChange={setValue}
                placeholder={props.placeholder}
            />
            {messageOn ? <span className={"validationSpan"}>{validationMessage}</span> : null}
        </>
    );
}

export default ValidationInput;
