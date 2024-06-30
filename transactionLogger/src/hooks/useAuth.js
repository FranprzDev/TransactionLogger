/* CustomHook to manage the authentication */

import { useState } from "react";

export const useAuth = (initialValue = { mail: "", password: ""}) => {
    const [dateForm, setDateForm] = useState(initialValue);

    const testRegex = (regex, value) => {
        return regex.test(value);
    };

    const updateForm = (data) => {

        setDateForm((prev) => {
            return { ...prev, ...data };
        });

    };

    return { dateForm, testRegex, updateForm };
};

export default useAuth;