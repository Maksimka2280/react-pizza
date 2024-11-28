
import cn from 'classnames';
import '../Input/Input.css'

export interface InputProps {
    type: 'text' | 'password' | 'email'; 
    placeholder?: string;
    name: string;
    id: string;
  
  }
  function InputLogin({  type, placeholder, name, id  }: InputProps) {
    return (
      <input
  
        type={type}
        className={cn('input')} 
        placeholder={placeholder}
        name={name}
        id={id}
       
      />
    );
  }
export default InputLogin 