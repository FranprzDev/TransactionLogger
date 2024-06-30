/* CustomHook to manage the authentication */

import { useState } from "react";

export const useForm = (
  initialValue = { description: "", amount: "", category: "", date: "" }
) => {
  const [transactionForm, setTransactionForm] = useState(initialValue);

  const updateForm = (data) => {
    setTransactionForm((prev) => {
      return { ...prev, ...data };
    });
  };

  return { transactionForm, updateForm };
};

export default useForm;
