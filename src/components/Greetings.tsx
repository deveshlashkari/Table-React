import {GreetingProps} from '../types';

export const Greetings = ({
    name,
    onSendWaves
}: GreetingProps) => {
    return (
        <div>
            <p>Hello {name}</p>
            {!!onSendWaves && (
                <button 
                    type="button"
                    onClick={() => onSendWaves(`Waves sent to ${name}!`)}
                >
                    Send
                </button>
            )}
        </div>
    )
}