// import { FC } from "react";
import "./Button.modul.css";
import { Buttonprops } from "./Button.props";
import cn from 'classnames';


// export const buttonAlt: FC<Buttonprops> = ({ children, className, ...props }) => {
//     return (
//         <button className={cn("button accent", className)} {...props}>{children}</button>
//     );
// }

function Button({ children, className, appersnce = 'spall', ...props }: Buttonprops) {
    // let text = "Сохранить";
    // const [text, setText] = useState('Сохранить')

    // const clicked = () => {
    //     setText("Закрыть");
    //     console.log("HI");
    // }
    return (
        <button
            className={cn("buttonaccent button", className, {
                spall: appersnce === 'spall' ,
                big: appersnce === 'big' ,
            })}
            {...props}
        >
            {children}
        </button>
    );
}
export default Button; 