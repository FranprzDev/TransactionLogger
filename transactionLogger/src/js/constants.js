
/* validaciones regex para contraseña */

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*\d).{9,}$/;

export function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

export const categories = [
  {value: 'Food', label: 'Food'},
  {value: 'Transport', label: 'Transport'},
  {value: 'Health', label: 'Health'},
  {value: 'Entertainment', label: 'Entertainment'},
  {value: 'Education', label: 'Education'},
  {value: 'Others', label: 'Others'}
];