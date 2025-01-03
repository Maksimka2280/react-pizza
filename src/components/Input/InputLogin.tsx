
import cn from 'classnames';
import '../Input/Input.css'

export interface InputProps {
    type: 'text' | 'password' | 'email'; 
    placeholder?: string;
    name: string;
    id: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  
  }
  function InputLogin({  type, placeholder, name, id , value, onChange }: InputProps) {
    return (
      <input
  
        type={type}
        className={cn('input')} 
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    );
  }
export default InputLogin 